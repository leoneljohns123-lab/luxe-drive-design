import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin } from "@/lib/admin-guard";
import { resolveImages } from "@/lib/supabase-public";
import { cleanVehicle, type VehicleInput } from "@/lib/vehicle-input";

export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("is_admin");
    const { count } = await context.supabase
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    return { isAdmin: Boolean(data), adminCount: count ?? 0, userId: context.userId };
  });

/** One-time bootstrap: the first signed-in user may claim the admin role. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) throw new Error("An administrator already exists for this workspace.");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const s = context.supabase;
    await assertAdmin(s);

    const head = { count: "exact" as const, head: true };

    const [
      vehiclesRes,
      availableRes,
      bookingsRes,
      pendingBookingsRes,
      leasesRes,
      pendingLeasesRes,
      driversRes,
      pendingDriversRes,
    ] = await Promise.all([
      s.from("vehicles").select("id", head).eq("archived", false),
      s.from("vehicles").select("id", head).eq("archived", false).eq("status", "available"),
      s.from("bookings").select("id", head),
      s.from("bookings").select("id", head).eq("status", "pending"),
      s.from("lease_applications").select("id", head),
      s.from("lease_applications").select("id", head).eq("status", "pending"),
      s.from("driver_applications").select("id", head),
      s.from("driver_applications").select("id", head).eq("status", "pending"),
    ]);

    const vehicles = vehiclesRes.count ?? 0;
    const available = availableRes.count ?? 0;
    const bookings = bookingsRes.count ?? 0;
    const pendingBookings = pendingBookingsRes.count ?? 0;
    const leases = leasesRes.count ?? 0;
    const pendingLeases = pendingLeasesRes.count ?? 0;
    const drivers = driversRes.count ?? 0;
    const pendingDrivers = pendingDriversRes.count ?? 0;


    const { data: recentBookings } = await s
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      vehicles,
      available,
      bookings,
      pendingBookings,
      leases,
      pendingLeases,
      drivers,
      pendingDrivers,
      recentBookings: recentBookings ?? [],
    };
  });

export const adminListVehicles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase);
    const { data, error } = await context.supabase
      .from("vehicles")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return Promise.all(
      (data ?? []).map(async (v) => ({
        ...v,
        images: await resolveImages(context.supabase, v.images),
        rawImages: v.images,
      })),
    );
  });

export const adminGetVehicle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const { data: row, error } = await context.supabase
      .from("vehicles")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Vehicle not found.");
    return { ...row, previews: await resolveImages(context.supabase, row.images) };
  });

export const saveVehicle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id?: string | null; values: VehicleInput }) => ({
    id: data.id ? String(data.id) : null,
    values: cleanVehicle(data.values),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    if (data.id) {
      const { error } = await context.supabase
        .from("vehicles")
        .update(data.values)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: row, error } = await context.supabase
      .from("vehicles")
      .insert(data.values)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const setVehicleStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: string }) => ({
    id: String(data.id),
    status: String(data.status),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const { error } = await context.supabase
      .from("vehicles")
      .update({ status: data.status as never })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const archiveVehicle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; archived: boolean }) => ({
    id: String(data.id),
    archived: Boolean(data.archived),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const { error } = await context.supabase
      .from("vehicles")
      .update({ archived: data.archived })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteVehicle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const { error } = await context.supabase.from("vehicles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase);
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: string; admin_notes?: string }) => ({
    id: String(data.id),
    status: data.status ? String(data.status) : undefined,
    admin_notes: typeof data.admin_notes === "string" ? data.admin_notes.slice(0, 2000) : undefined,
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const patch: Record<string, unknown> = {};
    if (data.status) patch["status"] = data.status;
    if (data.admin_notes !== undefined) patch["admin_notes"] = data.admin_notes;
    const { error } = await context.supabase
      .from("bookings")
      .update(patch as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListLeaseApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase);
    const { data, error } = await context.supabase
      .from("lease_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminListDriverApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase);
    const { data, error } = await context.supabase
      .from("driver_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { kind: "lease" | "driver"; id: string; status?: string; admin_notes?: string }) => ({
    kind: data.kind === "driver" ? ("driver" as const) : ("lease" as const),
    id: String(data.id),
    status: data.status ? String(data.status) : undefined,
    admin_notes: typeof data.admin_notes === "string" ? data.admin_notes.slice(0, 2000) : undefined,
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const patch: Record<string, unknown> = {};
    if (data.status) patch["status"] = data.status;
    if (data.admin_notes !== undefined) patch["admin_notes"] = data.admin_notes;
    const table = data.kind === "driver" ? "driver_applications" : "lease_applications";
    const { error } = await context.supabase
      .from(table)
      .update(patch as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const signDocuments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { paths: string[] }) => ({
    paths: (Array.isArray(data.paths) ? data.paths : []).map(String).filter(Boolean).slice(0, 20),
  }))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase);
    const out: { path: string; url: string }[] = [];
    for (const path of data.paths) {
      const { data: signed } = await context.supabase.storage
        .from("application-documents")
        .createSignedUrl(path, 60 * 30);
      if (signed?.signedUrl) out.push({ path, url: signed.signedUrl });
    }
    return out;
  });
