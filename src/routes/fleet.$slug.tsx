import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Check, Fuel, Gauge, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppButton";
import { getVehicle, whatsappLink } from "@/data/fleet";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/fleet/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: `Vehicle not found | ${BRAND.name}` }, { name: "robots", content: "noindex" }],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.name} — Hire from ${vehicle.pricePerDay}/day | ${BRAND.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: vehicle.description },
        { property: "og:title", content: title },
        { property: "og:description", content: vehicle.description },
      ],
    };
  },
  notFoundComponent: VehicleNotFound,
  component: VehicleDetail,
});

function VehicleNotFound() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Vehicle not available</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          That vehicle isn't in our fleet. Browse what we have on the road today.
        </p>
        <Button asChild variant="gold" className="mt-6">
          <Link to="/fleet">Back to fleet</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();
  const specs = [
    { icon: Users, label: "Seats", value: `${vehicle.seats}` },
    { icon: Briefcase, label: "Luggage", value: `${vehicle.bags} bags` },
    { icon: Gauge, label: "Gearbox", value: vehicle.transmission },
    { icon: Fuel, label: "Fuel", value: vehicle.fuel },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/fleet"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="size-4" /> All vehicles
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className="eyebrow mt-8">{vehicle.category}</p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{vehicle.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {vehicle.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-surface p-4">
                  <s.icon className="size-4 text-gold" />
                  <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold">{s.value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold">Included with this vehicle</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {[...vehicle.features, "Comprehensive insurance", "Unlimited mileage", "24/7 roadside assistance", "Free delivery within the city"].map(
                (f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ),
              )}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">From</p>
              <p className="mt-1 font-display text-4xl font-bold text-gold">
                ${vehicle.pricePerDay}
                <span className="text-base font-medium text-muted-foreground"> / day</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Taxes, insurance and cleaning included. Weekly rates available.
              </p>

              <div className="mt-6 grid gap-2.5">
                <Button asChild variant="gold" size="lg">
                  <Link to="/book" search={{ vehicle: vehicle.slug }}>
                    Reserve this vehicle
                  </Link>
                </Button>
                <Button asChild variant="whatsapp" size="lg">
                  <a
                    href={whatsappLink(
                      `Hello ${BRAND.name}, I'd like to book the ${vehicle.name} (${vehicle.pricePerDay}/day).`,
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <MessageCircle /> Book on WhatsApp
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                No prepayment required to hold a vehicle.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab message={`Hello, is the ${vehicle.name} available?`} />
    </div>
  );
}
