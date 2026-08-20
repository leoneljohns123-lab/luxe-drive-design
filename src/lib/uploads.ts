import { supabase } from "@/integrations/supabase/client";

const MAX_BYTES = 10 * 1024 * 1024;

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
}

function randomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/** Uploads an applicant document to the private bucket, returns the storage path. */
export async function uploadApplicationFile(file: File, folder: string): Promise<string> {
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is larger than 10 MB.`);
  const path = `${folder}/${randomId()}-${safeName(file.name)}`;
  const { error } = await supabase.storage.from("application-documents").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return path;
}

/** Uploads a vehicle photo (admins only), returns the storage path. */
export async function uploadVehiclePhoto(file: File): Promise<string> {
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is larger than 10 MB.`);
  const path = `fleet/${randomId()}-${safeName(file.name)}`;
  const { error } = await supabase.storage.from("vehicle-photos").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return path;
}

export async function signVehiclePhoto(path: string): Promise<string> {
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const { data } = await supabase.storage
    .from("vehicle-photos")
    .createSignedUrl(path, 60 * 60 * 24);
  return data?.signedUrl ?? "";
}
