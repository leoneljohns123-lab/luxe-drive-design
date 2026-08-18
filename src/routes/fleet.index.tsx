import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VehicleCard } from "@/components/site/VehicleCard";
import { fleet } from "@/data/fleet";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/fleet/")({
  head: () => ({
    meta: [
      { title: `Our Fleet — Luxury Sedans, SUVs & 4x4s | ${BRAND.name}` },
      {
        name: "description",
        content:
          `Browse the ${BRAND.name} fleet: executive sedans, seven-seat SUVs, electric grand tourers, group vans and safari-ready 4x4s with daily rates.`,
      },
      { property: "og:title", content: `Our Fleet — Luxury Sedans, SUVs & 4x4s | ${BRAND.name}` },
      {
        property: "og:description",
        content: "Executive sedans, SUVs, electric tourers, group vans and expedition 4x4s.",
      },
    ],
  }),
  component: FleetPage,
});

const categories = ["All", "Luxury", "SUV", "Sports", "Group", "Adventure", "Economy"] as const;

function FleetPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const shown = active === "All" ? fleet : fleet.filter((v) => v.category === active);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">The fleet</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Pick your drive</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every vehicle is under three years old, serviced on schedule and detailed before each
          hire. Rates include insurance, unlimited mileage and 24/7 assistance.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors " +
                (active === c
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
