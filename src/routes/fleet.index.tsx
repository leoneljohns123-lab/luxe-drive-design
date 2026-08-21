import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VehicleCard } from "@/components/site/VehicleCard";
import { StatusKey } from "@/components/site/StatusKey";
import { vehiclesQuery } from "@/lib/vehicle-queries";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/fleet/")({
  head: () => ({
    meta: [
      { title: `Our Fleet — Luxury Sedans, SUVs & 4x4s | ${BRAND.name}` },
      {
        name: "description",
        content: `Browse the ${BRAND.name} fleet: executive sedans, seven-seat SUVs, electric grand tourers, group vans and safari-ready 4x4s with live availability and daily rates.`,
      },
      { property: "og:title", content: `Our Fleet — Luxury Sedans, SUVs & 4x4s | ${BRAND.name}` },
      {
        property: "og:description",
        content: "Executive sedans, SUVs, electric tourers, group vans and expedition 4x4s.",
      },
    ],
  }),
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(vehiclesQuery);
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center" role="alert">
      <h1 className="font-display text-2xl font-bold">We couldn't load the fleet</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">No vehicles found.</div>
  ),
  component: FleetPage,
});

const categories = ["All", "Luxury", "SUV", "Sports", "Group", "Adventure", "Economy"] as const;

function FleetPage() {
  const { data: fleet } = useSuspenseQuery(vehiclesQuery);
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fleet.filter(
      (v) =>
        (active === "All" || v.category === active) &&
        (!q ||
          `${v.name} ${v.make} ${v.model} ${v.location} ${v.category}`.toLowerCase().includes(q)),
    );
  }, [fleet, active, query]);

  const tabs = useMemo(() => {
    const extra = fleet.map((v) => v.category).filter((c) => !categories.includes(c as never));
    return [...categories, ...Array.from(new Set(extra))];
  }, [fleet]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">The fleet</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Pick your drive</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every vehicle is serviced on schedule and detailed before each hire. Rates include
          insurance, mileage as listed and 24/7 assistance.
        </p>

        <div className="mt-8">
          <StatusKey compact />
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_280px] md:items-center">
          <div className="flex flex-wrap gap-2">
            {tabs.map((c) => (
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
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vehicles or locations"
            aria-label="Search vehicles"
            className="h-11 w-full rounded-full border border-border bg-surface px-4 text-sm outline-none focus:border-gold/60"
          />
        </div>

        {shown.length === 0 ? (
          <p className="mt-12 text-sm text-muted-foreground">
            No vehicles match that search just yet — try another category.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
