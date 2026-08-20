import { Link } from "@tanstack/react-router";
import { Briefcase, Gauge, MapPin, Users } from "lucide-react";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { money, type VehicleRow } from "@/lib/vehicle-types";

export type CardVehicle = Pick<
  VehicleRow,
  | "slug"
  | "name"
  | "tagline"
  | "category"
  | "price_daily"
  | "seats"
  | "luggage"
  | "transmission"
  | "location"
  | "status"
  | "images"
>;

export function VehicleCard({ vehicle }: { vehicle: CardVehicle }) {
  const image = vehicle.images?.[0];

  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-gold/40">
      <Link
        to="/fleet/$slug"
        params={{ slug: vehicle.slug }}
        className="relative block aspect-[4/3] overflow-hidden bg-surface-raised"
      >
        {image ? (
          <img
            src={image}
            alt={vehicle.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Photo coming soon
          </span>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur">
          {vehicle.category}
        </span>
        <StatusBadge status={vehicle.status} className="absolute right-4 top-4 backdrop-blur" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate font-display text-lg font-semibold">{vehicle.name}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{vehicle.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5 shrink-0 text-gold" /> {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="size-3.5 shrink-0 text-gold" /> {vehicle.luggage} bags
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="size-3.5 shrink-0 text-gold" /> {vehicle.transmission}
          </span>
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 text-gold" />
            <span className="truncate">{vehicle.location}</span>
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
              From
            </span>
            <span className="font-display text-xl font-bold text-gold">
              {money(vehicle.price_daily)}
            </span>
            <span className="text-xs text-muted-foreground"> / day</span>
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/fleet/$slug" params={{ slug: vehicle.slug }}>
              View details
            </Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/book" search={{ vehicle: vehicle.name }}>
              Book now
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
