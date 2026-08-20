export type VehicleStatus =
  | "available"
  | "reserved"
  | "rented"
  | "maintenance"
  | "unavailable";

export type StatusMeta = {
  value: VehicleStatus;
  label: string;
  dot: string;
  /** tailwind classes for the badge */
  className: string;
  description: string;
  bookable: boolean;
};

export const VEHICLE_STATUSES: StatusMeta[] = [
  {
    value: "available",
    label: "Available",
    dot: "🟢",
    className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    description: "Ready to book and collect today.",
    bookable: true,
  },
  {
    value: "reserved",
    label: "Reserved",
    dot: "🟡",
    className: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    description: "Held for another guest — ask us about the next free date.",
    bookable: true,
  },
  {
    value: "rented",
    label: "Currently rented",
    dot: "🔵",
    className: "border-sky-400/40 bg-sky-400/10 text-sky-300",
    description: "On hire right now. Join the waitlist for its return.",
    bookable: true,
  },
  {
    value: "maintenance",
    label: "Maintenance",
    dot: "🔴",
    className: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    description: "In the workshop for scheduled servicing.",
    bookable: false,
  },
  {
    value: "unavailable",
    label: "Unavailable",
    dot: "⚫",
    className: "border-border bg-surface-raised text-muted-foreground",
    description: "Off fleet for now — not accepting reservations.",
    bookable: false,
  },
];

export function statusMeta(status: string): StatusMeta {
  return VEHICLE_STATUSES.find((s) => s.value === status) ?? VEHICLE_STATUSES[4]!;
}

export const APPLICATION_STATUSES = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "completed",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

export function statusLabel(value: string) {
  return value.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export function applicationStatusClass(value: string) {
  switch (value) {
    case "approved":
      return "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
    case "under_review":
      return "border-sky-400/40 bg-sky-400/10 text-sky-300";
    case "rejected":
      return "border-rose-400/40 bg-rose-400/10 text-rose-300";
    case "completed":
      return "border-gold/40 bg-gold/10 text-gold";
    default:
      return "border-amber-400/40 bg-amber-400/10 text-amber-300";
  }
}
