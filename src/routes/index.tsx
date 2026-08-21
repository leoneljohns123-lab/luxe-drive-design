import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, Clock, Quote, ShieldCheck, Star } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SearchBar } from "@/components/site/SearchBar";
import { VehicleCard } from "@/components/site/VehicleCard";
import { CtaTrio } from "@/components/site/CtaTrio";
import { StatusKey } from "@/components/site/StatusKey";
import { vehiclesQuery } from "@/lib/vehicle-queries";
import { reviews, services } from "@/data/fleet";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.name} — Premium Car Hire & Luxury Vehicle Rental` },
      {
        name: "description",
        content:
          "Hire luxury sedans, SUVs, 4x4s and group vans with 24/7 delivery, transparent daily rates and instant WhatsApp booking.",
      },
      { property: "og:title", content: `${BRAND.name} — Premium Car Hire & Luxury Vehicle Rental` },
      {
        property: "og:description",
        content:
          "A curated fleet, chauffeur options and airport delivery. Reserve a vehicle in under two minutes.",
      },
    ],
  }),
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(vehiclesQuery);
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center" role="alert">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">Page not found.</div>
  ),
  component: Home,
});


const promises = [
  { icon: ShieldCheck, title: "Fully insured", text: "Comprehensive cover and 24/7 roadside assistance on every hire." },
  { icon: Clock, title: "Delivered in 60 min", text: "City-wide delivery and collection at a time that suits you." },
  { icon: BadgeCheck, title: "No hidden fees", text: "One daily rate. Mileage, cleaning and taxes already included." },
];

function Home() {
  const { data: fleet } = useSuspenseQuery(vehiclesQuery);
  const featured = [...fleet].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (

    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative isolate">
          <img
            src={heroImage}
            alt="Black luxury SUV on a wet city street at night"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="hero-veil absolute inset-0 -z-10" />

          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pt-36 lg:px-8 lg:pb-16 lg:pt-48">
            <div className="max-w-2xl rise-in">
              <p className="eyebrow">Premium car hire</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                Arrive the way
                <br />
                you intended.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                A meticulously maintained fleet, delivered to your door across Kenya and Germany. Book in minutes,
                drive the same day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link to="/fleet">
                    Explore the fleet <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-12 sm:mt-20">
              <SearchBar />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {promises.map((p) => (
              <div key={p.title} className="surface-card p-6">
                <p.icon className="size-6 text-gold" />
                <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="eyebrow">The fleet</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Chosen car, ready today
              </h2>
            </div>
            <Link
              to="/fleet"
              className="shrink-0 text-sm font-semibold text-gold hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.slice(0, 3).map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold sm:text-4xl">
              More than a set of keys
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-display text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/services">All services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Trusted by regulars</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="surface-card flex flex-col p-6">
                <Quote className="size-6 shrink-0 text-gold" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-2 truncate text-sm font-semibold">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="surface-card grid gap-6 p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Ready when you are
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Send us your dates and we'll confirm availability, pricing and delivery within
                minutes.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <Link to="/book">
                Start booking <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
