import { Link } from "@tanstack/react-router";
import { Briefcase, Gauge, Users } from "lucide-react";
import type { Vehicle } from "@/data/fleet";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/fleet/$slug"
      params={{ slug: vehicle.slug }}
      className="group surface-card block overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur">
          {vehicle.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="truncate font-display text-lg font-semibold">{vehicle.name}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{vehicle.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0 text-gold" /> {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="size-3.5 shrink-0 text-gold" /> {vehicle.bags} bags
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="size-3.5 shrink-0 text-gold" /> {vehicle.transmission}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <span className="min-w-0">
            <span className="font-display text-xl font-bold text-gold">${vehicle.pricePerDay}</span>
            <span className="text-xs text-muted-foreground"> / day</span>
          </span>
          <span className="shrink-0 text-xs font-semibold text-foreground group-hover:text-gold">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
