const text = (v: unknown, max = 400) => String(v ?? "").trim().slice(0, max);
const optInt = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
};
const optNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
};
const optDate = (v: unknown) => {
  const s = text(v, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
};
const emailish = (v: unknown) => {
  const s = text(v, 160).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) throw new Error("A valid email address is required.");
  return s;
};
const strings = (v: unknown, max = 12) =>
  Array.isArray(v) ? v.map((x) => text(x, 200)).filter(Boolean).slice(0, max) : [];

export type LeaseInput = Record<string, unknown>;
export type DriverInput = Record<string, unknown>;
export type BookingInput = Record<string, unknown>;

export function cleanLease(d: LeaseInput) {
  const owner_name = text(d["owner_name"], 120);
  if (!owner_name) throw new Error("Your name is required.");
  return {
    owner_name,
    owner_email: emailish(d["owner_email"]),
    owner_phone: text(d["owner_phone"], 40),
    owner_city: text(d["owner_city"], 80),
    owner_country: text(d["owner_country"], 40) || "Kenya",
    vehicle_make: text(d["vehicle_make"], 60),
    vehicle_model: text(d["vehicle_model"], 60),
    vehicle_year: optInt(d["vehicle_year"]),
    registration: text(d["registration"], 30),
    mileage_km: optInt(d["mileage_km"]),
    transmission: text(d["transmission"], 20) || "Automatic",
    fuel: text(d["fuel"], 20) || "Petrol",
    seats: optInt(d["seats"]),
    condition_notes: text(d["condition_notes"], 1000),
    insurance_status: text(d["insurance_status"], 80),
    availability: text(d["availability"], 120),
    expected_monthly: optNum(d["expected_monthly"]),
    logbook_path: text(d["logbook_path"], 300) || null,
    insurance_path: text(d["insurance_path"], 300) || null,
    inspection_path: text(d["inspection_path"], 300) || null,
    photo_paths: strings(d["photo_paths"], 10),
    message: text(d["message"], 1000),
  };
}

export function cleanDriver(d: DriverInput) {
  const full_name = text(d["full_name"], 120);
  if (!full_name) throw new Error("Your name is required.");
  return {
    full_name,
    email: emailish(d["email"]),
    phone: text(d["phone"], 40),
    date_of_birth: optDate(d["date_of_birth"]),
    city: text(d["city"], 80),
    country: text(d["country"], 40) || "Kenya",
    licence_number: text(d["licence_number"], 60),
    licence_class: text(d["licence_class"], 40),
    licence_expiry: optDate(d["licence_expiry"]),
    years_experience: optInt(d["years_experience"]),
    languages: text(d["languages"], 200),
    vehicle_types: strings(d["vehicle_types"], 10),
    availability: text(d["availability"], 120),
    preferred_hours: text(d["preferred_hours"], 120),
    has_own_vehicle: Boolean(d["has_own_vehicle"]),
    experience_notes: text(d["experience_notes"], 1500),
    licence_path: text(d["licence_path"], 300) || null,
    id_path: text(d["id_path"], 300) || null,
    good_conduct_path: text(d["good_conduct_path"], 300) || null,
    cv_path: text(d["cv_path"], 300) || null,
    photo_path: text(d["photo_path"], 300) || null,
  };
}

export function cleanBooking(d: BookingInput) {
  const customer_name = text(d["customer_name"], 120);
  if (!customer_name) throw new Error("Your name is required.");
  return {
    customer_name,
    customer_email: emailish(d["customer_email"]),
    customer_phone: text(d["customer_phone"], 40),
    vehicle_id: text(d["vehicle_id"], 60) || null,
    vehicle_name: text(d["vehicle_name"], 120),
    pickup_location: text(d["pickup_location"], 160),
    dropoff_location: text(d["dropoff_location"], 160),
    pickup_date: optDate(d["pickup_date"]),
    pickup_time: text(d["pickup_time"], 20),
    return_date: optDate(d["return_date"]),
    return_time: text(d["return_time"], 20),
    with_driver: Boolean(d["with_driver"]),
    notes: text(d["notes"], 1000),
  };
}
