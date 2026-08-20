import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Publishable-key client for use INSIDE server function handlers only.
 * RLS applies as the anonymous role.
 */
export function publicServerClient(): SupabaseClient<Database> {
  const url = process.env["SUPABASE_URL"]!;
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"] ?? "";

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const SIGNED_TTL = 60 * 60 * 24 * 7;

/** Storage paths are signed; absolute/CDN URLs are passed through untouched. */
export async function resolveImages(
  client: SupabaseClient<Database>,
  images: string[] | null,
): Promise<string[]> {
  const list = images ?? [];
  const out: string[] = [];
  for (const img of list) {
    if (!img) continue;
    if (img.startsWith("http") || img.startsWith("/")) {
      out.push(img);
      continue;
    }
    const { data } = await client.storage.from("vehicle-photos").createSignedUrl(img, SIGNED_TTL);
    if (data?.signedUrl) out.push(data.signedUrl);
  }
  return out;
}
