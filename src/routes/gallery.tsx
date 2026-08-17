import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery — ${BRAND.name} Kenya & Germany Car Hire` },
      {
        name: "description",
        content:
          "A look at our vehicles, delivery moments and the journeys our customers take across Kenya and Germany.",
      },
    ],
  }),
  component: GalleryPage,
});

const galleryItems = [
  { title: "Airport arrivals", caption: "Meet-and-greet handovers, flight tracked." },
  { title: "Coastal drives", caption: "Convertibles and SUVs along the Kenyan coast." },
  { title: "Safari-ready 4x4s", caption: "Recovery gear and satellite tracking included." },
  { title: "City collection", caption: "Walk-in desks in Westlands and Frankfurt." },
  { title: "Group travel", caption: "Eight-seat vans for delegations and weddings." },
  { title: "Alpine touring", caption: "Grand tourers for long German road trips." },
];

function GalleryPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Moments from the road</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A glimpse of the vehicles, handovers and journeys we arrange across Kenya and Germany.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure
              key={item.title}
              className="surface-card group relative overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-raised via-surface to-background transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-background/70 font-display text-sm font-bold text-gold backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="p-5">
                <h2 className="font-display text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="surface-card mt-12 grid gap-6 p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready for your journey?</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Browse the fleet and reserve a vehicle in minutes — we confirm availability and delivery on WhatsApp.
            </p>
          </div>
          <Button asChild variant="gold" size="lg" className="shrink-0">
            <Link to="/fleet">View the fleet <ArrowRight /></Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
