import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Car, Check, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { fleet } from "@/data/fleet";
import { BRAND, locations, whatsappLink } from "@/data/site";

type BookSearch = { pickup?: string; start?: string; end?: string; vehicle?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    pickup: typeof search.pickup === "string" ? search.pickup : undefined,
    start: typeof search.start === "string" ? search.start : undefined,
    end: typeof search.end === "string" ? search.end : undefined,
    vehicle: typeof search.vehicle === "string" ? search.vehicle : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Car — Kenya & Germany Hire | Dama Royal Safaris" },
      {
        name: "description",
        content:
          "Reserve a chauffeured or self-drive vehicle in Kenya or Germany. Pick your dates and location, then confirm instantly on WhatsApp.",
      },
      { property: "og:title", content: "Book a Car | Dama Royal Safaris" },
      {
        property: "og:description",
        content: "Simple three-step booking with instant WhatsApp confirmation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-gold/60";

function BookPage() {
  const search = Route.useSearch();
  const today = new Date().toISOString().slice(0, 10);

  const [pickup, setPickup] = useState(search.pickup ?? locations[0]?.label ?? "");
  const [start, setStart] = useState(search.start ?? today);
  const [end, setEnd] = useState(search.end ?? today);
  const [vehicle, setVehicle] = useState(search.vehicle ?? fleet[0]?.name ?? "");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const message = `Hello ${BRAND.name}, I'd like to book:
Name: ${name || "—"}
Vehicle: ${vehicle}
Pick-up: ${pickup}
Dates: ${start} to ${end}
Notes: ${notes || "—"}`;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Booking</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Reserve your vehicle</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Three short steps. We confirm availability, pricing and delivery on WhatsApp within
          minutes.
        </p>

        <form className="surface-card mt-8 grid gap-5 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Car className="size-3.5 text-gold" /> Vehicle
            </span>
            <select
              className={fieldClass}
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              {fleet.map((v) => (
                <option key={v.slug} value={v.name}>
                  {v.name} — ${v.pricePerDay}/day
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="size-3.5 text-gold" /> Pick-up location
            </span>
            <select className={fieldClass} value={pickup} onChange={(e) => setPickup(e.target.value)}>
              {locations.map((l) => (
                <option key={l.label} value={l.label}>
                  {l.country} · {l.city} — {l.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays className="size-3.5 text-gold" /> Pick-up date
              </span>
              <input
                type="date"
                className={fieldClass}
                min={today}
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays className="size-3.5 text-gold" /> Return date
              </span>
              <input
                type="date"
                className={fieldClass}
                min={start}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Your name</span>
            <input
              className={fieldClass}
              value={name}
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Anything else? (driver, child seat, delivery address)
            </span>
            <textarea
              className="min-h-24 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-gold/60"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <Button asChild variant="gold" size="lg">
            <a href={whatsappLink(message)} target="_blank" rel="noreferrer noopener">
              <MessageCircle /> Confirm on WhatsApp
            </a>
          </Button>

          <ul className="grid gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
            {[
              "No payment taken online — we confirm the quote first",
              "Free cancellation up to 24 hours before pick-up",
              "Insurance, taxes and mileage included in every rate",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-gold" /> {t}
              </li>
            ))}
          </ul>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
