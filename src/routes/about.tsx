import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import logo from "@/assets/image copy 2.png";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${BRAND.name} — Kenya & Germany Car Hire` },
      {
        name: "description",
        content:
          "Discover the people, standards and personal service behind Dama Royal Safaris in Kenya and Germany.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "Prepared with care", text: "Every vehicle is checked, cleaned and ready before it reaches you." },
  { icon: HeartHandshake, title: "Personal service", text: "You speak with the same real team from first enquiry to key handover." },
  { icon: Compass, title: "Made for the journey", text: "From airport transfers to safari roads, we match the vehicle to your plans." },
  { icon: BadgeCheck, title: "Clear from the start", text: "Straightforward rates, practical advice and no surprise additions." },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">About {BRAND.name}</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-6xl">The road feels better when everything is taken care of.</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {BRAND.name} brings considered car hire to Kenya and Germany. We combine a carefully maintained fleet with warm, direct support, so your journey starts before you turn the key.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg"><Link to="/fleet">Explore the fleet <ArrowRight /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/contact">Talk to our team</Link></Button>
            </div>
          </div>
          <div className="surface-card overflow-hidden p-5 sm:p-8">
            <div className="rounded-2xl bg-black/20 p-5 sm:p-8">
              <img src={logo} alt={`${BRAND.name} logo`} className="mx-auto w-full max-w-md object-contain" />
            </div>
            <p className="mt-5 text-center text-xs uppercase tracking-[0.24em] text-gold">Where comfort meets the road</p>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="eyebrow">Our standards</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">Small details make a big difference.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-border bg-background p-6">
                  <value.icon className="size-6 text-gold" />
                  <h3 className="mt-5 font-display text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="eyebrow">Two countries, one standard</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From the terminal to the open road.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether you are landing in Nairobi, planning a coastal escape, arriving in Frankfurt for business or setting off through the Alps, our team makes collection and delivery simple.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
