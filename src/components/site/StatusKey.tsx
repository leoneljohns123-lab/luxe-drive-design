import { VEHICLE_STATUSES } from "@/lib/vehicle-status";

export function StatusKey({ compact = false }: { compact?: boolean }) {
  return (
    <div className="surface-card p-5 sm:p-6">
      <h3 className="font-display text-base font-semibold">Availability key</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Every vehicle card and details page shows one of these live statuses.
      </p>
      <ul
        className={
          "mt-4 grid gap-3 " + (compact ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2")
        }
      >
        {VEHICLE_STATUSES.map((s) => (
          <li key={s.value} className="rounded-xl border border-border bg-background p-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden>{s.dot}</span>
              {s.label}
            </span>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
