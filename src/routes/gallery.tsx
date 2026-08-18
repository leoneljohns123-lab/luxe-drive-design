import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import hero from "@/assets/hero.jpg";
import sedan from "@/assets/car-sedan.jpg";
import suv from "@/assets/car-suv.jpg";
import coupe from "@/assets/car-coupe.jpg";
import van from "@/assets/car-van.jpg";
import offroad from "@/assets/car-4x4.jpg";
import compact from "@/assets/car-compact.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Our Fleet & Journeys | Dama Royal Safaris" },
      {
        name: "description",
        content:
          "Photographs of our sedans, SUVs, safari 4x4s and group vans on the road in Kenya and Germany.",
      },
      { property: "og:title", content: "Gallery | Dama Royal Safaris" },
      {
        property: "og:description",
        content: "A look at the fleet and the roads we travel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const shots = [
  { src: hero, alt: "Luxury SUV on a city street at night", span: "sm:col-span-2 sm:row-span-2" },
  { src: sedan, alt: "Executive sedan ready for an airport transfer", span: "" },
  { src: suv, alt: "White seven-seat SUV prepared for a family trip", span: "" },
  { src: offroad, alt: "Safari-prepared 4x4 on a dirt track", span: "sm:col-span-2" },
  { src: coupe, alt: "Silver grand tourer parked at dusk", span: "" },
  { src: van, alt: "Group van with captain chairs", span: "" },
  { src: compact, alt: "City compact car in an urban street", span: "sm:col-span-2" },
];

function GalleryPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The fleet in the wild</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          From Nairobi rush hour to Bavarian back roads — a look at the cars we hand over and the
          places they take our guests.
        </p>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[200px]">
          {shots.map((s) => (
            <figure
              key={s.alt}
              className={`group relative overflow-hidden rounded-2xl border border-border ${s.span}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs text-muted-foreground">
                {s.alt}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="surface-card mt-12 flex flex-wrap items-center justify-between gap-4 p-8">
          <p className="font-display text-xl font-bold">See one you like?</p>
          <div className="flex gap-3">
            <Button asChild variant="gold">
              <Link to="/fleet">Browse the fleet</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/book">Book now</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
