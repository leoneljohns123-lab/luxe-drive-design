import { createServerFn } from "@tanstack/react-start";
import { publicServerClient } from "@/lib/supabase-public";
import type { LeaseInput, DriverInput, BookingInput } from "@/lib/application-input";
import { cleanBooking, cleanDriver, cleanLease } from "@/lib/application-input";

export const submitLeaseApplication = createServerFn({ method: "POST" })
  .inputValidator((data: LeaseInput) => cleanLease(data))
  .handler(async ({ data }) => {
    const client = publicServerClient();
    const { data: row, error } = await client
      .from("lease_applications")
      .insert(data)
      .select("reference")
      .single();
    if (error) throw new Error(error.message);
    return { reference: row.reference };
  });

export const submitDriverApplication = createServerFn({ method: "POST" })
  .inputValidator((data: DriverInput) => cleanDriver(data))
  .handler(async ({ data }) => {
    const client = publicServerClient();
    const { data: row, error } = await client
      .from("driver_applications")
      .insert(data)
      .select("reference")
      .single();
    if (error) throw new Error(error.message);
    return { reference: row.reference };
  });

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: BookingInput) => cleanBooking(data))
  .handler(async ({ data }) => {
    const client = publicServerClient();
    const { data: row, error } = await client
      .from("bookings")
      .insert(data)
      .select("reference")
      .single();
    if (error) throw new Error(error.message);
    return { reference: row.reference };
  });

export const trackApplication = createServerFn({ method: "POST" })
  .inputValidator((data: { reference: string; email: string }) => ({
    reference: String(data.reference ?? "").trim().slice(0, 40),
    email: String(data.email ?? "").trim().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    if (!data.reference || !data.email) throw new Error("Reference and email are required.");
    const client = publicServerClient();
    const { data: rows, error } = await client.rpc("track_application", {
      _reference: data.reference,
      _email: data.email,
    });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
