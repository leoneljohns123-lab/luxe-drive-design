import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { locations, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Pick-Up Locations in Kenya & Germany | Dama Royal Safaris" },
      {
        name: "description",
        content:
          "Collect your car at every major airport in Kenya and Germany — NBO, MBA, KIS, FRA, MUC, BER and more — plus city and town desks with free delivery.",
      },
      { property: "og:title", content: "Pick-Up Locations in Kenya & Germany" },
      {
        property: "og:description",
        content: "Airports, cities and towns across two countries, plus door delivery on request.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: LocationsPage,
});

const filters = ["All", "Kenya", "Germany", "Airports"] as const;

function LocationsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const shown = locations.filter((l) => {
    if (filter === "All") return true;
    if (filter === "Airports") return l.type === "Airport";
    return l.country === filter;
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Locations</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Collect anywhere</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We serve every major airport in Kenya and Germany, plus city desks and town points — and
          we deliver free within city limits. Tell us where you'll be and the car will be waiting.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <div key={l.label} className="surface-card p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">
                  {l.country} · {l.city}
                </p>
                {l.type === "Airport" && <Plane className="size-4 shrink-0 text-gold" />}
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold">{l.label}</h2>
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
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
