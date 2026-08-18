import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  CalendarDays,
  Mountain,
  Plane,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { services } from "@/data/fleet";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services — Airport Transfers, Chauffeurs & Corporate Hire | ${BRAND.name}` },
      {
        name: "description",
        content:
          `Airport transfers, chauffeur hire, corporate accounts, wedding cars, long-term leasing and safari expeditions from ${BRAND.name}.`,
      },
      {
        property: "og:title",
        content: `Services — Airport Transfers, Chauffeurs & Corporate Hire | ${BRAND.name}`,
      },
      {
        property: "og:description",
        content: "Chauffeurs, corporate accounts, weddings, leasing and safari-ready expeditions.",
      },
    ],
  }),
  component: ServicesPage,
});

const icons: Record<string, LucideIcon> = {
  plane: Plane,
  user: User,
  briefcase: Briefcase,
  sparkles: Sparkles,
  calendar: CalendarDays,
  mountain: Mountain,
};

const steps = [
  { n: "01", t: "Tell us the dates", d: "Share pick-up point, dates and the kind of vehicle you need." },
  { n: "02", t: "We confirm in minutes", d: "Availability, final pricing and delivery window sent to you." },
  { n: "03", t: "Drive away", d: "Vehicle delivered, documents signed digitally, keys in hand." },
];

function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Built around how you travel
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether it's a single airport run or a fleet on standing order, the same team handles it
            end to end.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = icons[s.icon] ?? Sparkles;
              return (
                <div key={s.title} className="surface-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-surface-raised">
                    <Icon className="size-5 text-gold" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Three steps, no queue</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl border border-border bg-background p-6">
                  <span className="font-display text-3xl font-bold text-gold/40">{s.n}</span>
                  <h3 className="mt-3 font-display text-base font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="gold" size="lg" className="mt-8">
              <Link to="/book">Start a booking</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
