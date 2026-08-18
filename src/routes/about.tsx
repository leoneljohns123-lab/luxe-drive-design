import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, HeartHandshake, ShieldCheck, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import heroImage from "@/assets/hero.jpg";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dama Royal Safaris — Car Hire in Kenya & Germany" },
      {
        name: "description",
        content:
          "A family-run car hire and safari company operating between Kenya and Germany, built on comfort, punctuality and honest pricing.",
      },
      { property: "og:title", content: "About Dama Royal Safaris" },
      {
        property: "og:description",
        content: "Two countries, one standard of service. Meet the team behind the fleet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Every vehicle is serviced on schedule, fully insured and checked before each handover.",
  },
  {
    icon: Globe2,
    title: "Two homes",
    text: "Desks in Kenya and Germany mean familiar service whichever country you land in.",
  },
  {
    icon: HeartHandshake,
    title: "Honest pricing",
    text: "One clear rate. Taxes, mileage and cleaning are included — no surprises at return.",
  },
  {
    icon: Sparkle,
    title: "Comfort as standard",
    text: "Our name is a promise: where comfort meets the road, on tarmac or in the bush.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative isolate">
          <img
            src={heroImage}
            alt="Luxury vehicle on an open road at dusk"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="hero-veil absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 pb-14 pt-24 sm:px-6 sm:pt-32 lg:px-8">
            <p className="eyebrow">About us</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
              Where comfort meets the road
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {BRAND.name} began with a single 4x4 and a simple idea: travellers deserve a vehicle
              that arrives clean, on time and ready for the journey ahead — whether that journey
              starts at Jomo Kenyatta International or Frankfurt Airport.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Our story</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Founded by a Kenyan-German family who spent years shuttling between Nairobi and the
                Rhine, we know both sides of the journey: the visitor arriving for a first safari,
                and the diaspora traveller coming home for a season.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Today we operate a curated fleet across both countries — executive sedans and
                estate cars in Germany, safari-ready 4x4s, group vans and city runabouts in Kenya —
                with the same team answering the phone in either time zone.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">How we work</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>You send dates and a pick-up point — by form, phone or WhatsApp.</li>
                <li>We confirm availability and a final, all-inclusive quote in minutes.</li>
                <li>The vehicle is prepared, fuelled and delivered to you, or waiting on arrival.</li>
                <li>Support stays reachable for the whole hire, including roadside assistance.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="surface-card p-6">
                <v.icon className="size-6 text-gold" />
                <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="surface-card mt-12 flex flex-wrap items-center justify-between gap-4 p-8">
            <p className="font-display text-xl font-bold">Planning a trip with us?</p>
            <div className="flex gap-3">
              <Button asChild variant="gold">
                <Link to="/book">Start booking</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
