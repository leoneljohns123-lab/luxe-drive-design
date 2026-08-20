import { createServerFn } from "@tanstack/react-start";
import { publicServerClient, resolveImages } from "@/lib/supabase-public";

export const listVehicles = createServerFn({ method: "GET" }).handler(async () => {
  const client = publicServerClient();
  const { data, error } = await client
    .from("vehicles")
    .select("*")
    .eq("archived", false)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return Promise.all(
    (data ?? []).map(async (v) => ({ ...v, images: await resolveImages(client, v.images) })),
  );
});

export const getVehicleBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const client = publicServerClient();
    const { data: row, error } = await client
      .from("vehicles")
      .select("*")
      .eq("slug", data.slug)
      .eq("archived", false)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!row) return null;

    const { data: related } = await client
      .from("vehicles")
      .select("*")
      .eq("archived", false)
      .neq("slug", data.slug)
      .limit(6);

    const pool = related ?? [];
    const sameCategory = pool.filter((r) => r.category === row.category);
    const picked = (sameCategory.length >= 3 ? sameCategory : pool).slice(0, 3);

    return {
      vehicle: { ...row, images: await resolveImages(client, row.images) },
      related: await Promise.all(
        picked.map(async (r) => ({ ...r, images: await resolveImages(client, r.images) })),
      ),
    };
  });
