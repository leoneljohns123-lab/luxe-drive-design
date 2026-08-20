import { slugify } from "@/lib/vehicle-types";

export type VehicleInput = Record<string, unknown>;

const text = (v: unknown, max = 400) => String(v ?? "").trim().slice(0, max);
const num = (v: unknown, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};
const optNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};
const list = (v: unknown, max = 30) =>
  Array.isArray(v) ? v.map((x) => text(x, 300)).filter(Boolean).slice(0, max) : [];

const STATUSES = ["available", "reserved", "rented", "maintenance", "unavailable"];

export function cleanVehicle(input: VehicleInput) {
  const name = text(input["name"], 120);
  if (!name) throw new Error("Vehicle name is required.");
  const status = text(input["status"], 20);

  return {
    name,
    slug: slugify(text(input["slug"], 80) || name) || slugify(`${name}-${Date.now()}`),
    make: text(input["make"], 60),
    model: text(input["model"], 60),
    year: optNum(input["year"]) ? Math.round(Number(input["year"])) : null,
    category: text(input["category"], 40) || "Luxury",
    tagline: text(input["tagline"], 160),
    price_daily: num(input["price_daily"]),
    price_weekly: optNum(input["price_weekly"]),
    price_monthly: optNum(input["price_monthly"]),
    transmission: text(input["transmission"], 20) || "Automatic",
    fuel: text(input["fuel"], 30) || "Petrol",
    engine_capacity: text(input["engine_capacity"], 40),
    seats: Math.max(1, Math.round(num(input["seats"], 4))),
    luggage: Math.round(num(input["luggage"], 2)),
    mileage: text(input["mileage"], 60) || "Unlimited",
    location: text(input["location"], 120) || "Nairobi, Kenya",
    features: list(input["features"], 20),
    description: text(input["description"], 4000),
    rental_terms: text(input["rental_terms"], 4000),
    images: list(input["images"], 12),
    status: (STATUSES.includes(status) ? status : "available") as
      | "available"
      | "reserved"
      | "rented"
      | "maintenance"
      | "unavailable",
    featured: Boolean(input["featured"]),
    archived: Boolean(input["archived"]),
    sort_order: Math.round(num(input["sort_order"], 0)),
  };
}
