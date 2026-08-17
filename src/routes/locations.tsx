import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Plane, Building2, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppButton";
import { kenyaLocations, germanyLocations, whatsappLink, type Location } from "@/data/site";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — Kenya & Germany Airports, Cities & Towns | Dama Royal Safaris" },
      {
        name: "description",
        content:
          "Collect your hire vehicle from airports, cities and towns across Kenya and Germany — or have it delivered to your door.",
      },
    ],
  }),
  component: LocationsPage,
});

const typeIcon: Record<Location["type"], typeof Plane> = {
  Airport: Plane,
  City: Building2,
  Town: Trees,
};

function LocationCard({ l }: { l: Location }) {
  const Icon = typeIcon[l.type];
  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">{l.city}</p>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/30 bg-surface-raised">
          <Icon className="size-4 text-gold" />
        </span>
      </div>
      <h2 className="mt-2 font-display text-xl font-semibold">{l.label}</h2>
      <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {l.address}
      </p>
      <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
        <Clock className="mt-0.5 size-4 shrink-0 text-gold" /> {l.hours}
      </p>
      <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        {l.note}
      </p>
      <Button asChild variant="outline" size="sm" className="mt-5">
        <a
          href={whatsappLink(`Hello, I'd like to collect a vehicle from ${l.label}.`)}
          target="_blank"
          rel="noreferrer noopener"
        >
          <MessageCircle /> Arrange pick-up
        </a>
      </Button>
    </div>
  );
}

function LocationsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Locations</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Collect anywhere</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Staffed desks at airports, cities and towns across Kenya and Germany — plus free delivery within city limits. Tell us where you'll be and the car will be waiting.
        </p>

        <section className="mt-12">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl border border-gold/30 bg-surface-raised font-display text-sm font-bold text-gold">KE</span>
            <h2 className="font-display text-2xl font-bold">Kenya</h2>
            <span className="text-sm text-muted-foreground">{kenyaLocations.length} pick-up points</span>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kenyaLocations.map((l) => (
              <LocationCard key={l.label} l={l} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl border border-gold/30 bg-surface-raised font-display text-sm font-bold text-gold">DE</span>
            <h2 className="font-display text-2xl font-bold">Germany</h2>
            <span className="text-sm text-muted-foreground">{germanyLocations.length} pick-up points</span>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {germanyLocations.map((l) => (
              <LocationCard key={l.label} l={l} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab message="Hello, which pick-up point is closest to me?" />
    </div>
  );
}
