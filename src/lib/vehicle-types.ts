import type { Database } from "@/integrations/supabase/types";

export type VehicleRow = Database["public"]["Tables"]["vehicles"]["Row"];
export type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
export type LeaseRow = Database["public"]["Tables"]["lease_applications"]["Row"];
export type DriverRow = Database["public"]["Tables"]["driver_applications"]["Row"];

export const VEHICLE_CATEGORIES = [
  "Luxury",
  "SUV",
  "Sports",
  "Group",
  "Adventure",
  "Economy",
  "Van",
  "Pickup",
] as const;

export const TRANSMISSIONS = ["Automatic", "Manual"] as const;
export const FUELS = ["Petrol", "Diesel", "Petrol Hybrid", "Electric", "LPG"] as const;

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function money(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
