import { statusMeta } from "@/lib/vehicle-status";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
  size = "sm",
}: {
  status: string;
  className?: string;
  size?: "sm" | "lg";
}) {
  const meta = statusMeta(status);
  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider",
        size === "lg" ? "px-3.5 py-1.5 text-xs" : "px-2.5 py-1 text-[10px]",
        meta.className,
        className,
      )}
    >
      <span aria-hidden className="text-[0.8em] leading-none">
        {meta.dot}
      </span>
      {meta.label}
    </span>
  );
}
