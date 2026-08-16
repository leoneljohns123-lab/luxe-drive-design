import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppButton";
import { locations, whatsappLink } from "@/data/fleet";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations — Nairobi, Mombasa & Kisumu Branches | Aurum Drive" },
      {
        name: "description",
        content:
          "Collect from our Westlands flagship, JKIA airport desk, Nyali coast branch or Kisumu lakeside depot — or have the vehicle delivered to you.",
      },
      { property: "og:title", content: "Locations — Nairobi, Mombasa & Kisumu | Aurum Drive" },
      {
        property: "og:description",
        content: "Four pick-up points across Kenya, plus door delivery on request.",
      },
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Locations</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Collect anywhere</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Four staffed branches, plus free delivery within city limits. Tell us where you'll be and
          the car will be waiting.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {locations.map((l) => (
            <div key={l.label} className="surface-card p-6">
              <p className="eyebrow">{l.city}</p>
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
          ))}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab message="Hello, which branch is closest to me?" />
    </div>
  );
}
