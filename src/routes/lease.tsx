import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Field, Faqs, InfoList, SectionCard, inputClass, textareaClass } from "@/components/site/form-bits";
import { FileInput } from "@/components/site/FileInput";
import { submitLeaseApplication } from "@/lib/applications.functions";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/lease")({
  head: () => ({
    meta: [
      { title: `Lease Your Car — Earn With Your Vehicle | ${BRAND.name}` },
      {
        name: "description",
        content:
          "List your car with Dama Royal Safaris. We handle rentals, vetting, cleaning, maintenance coordination and payouts while you earn a monthly income.",
      },
      { property: "og:title", content: `Lease Your Car | ${BRAND.name}` },
      {
        property: "og:description",
        content: "Put your vehicle on our fleet and earn a predictable monthly income.",
      },
    ],
  }),
  component: LeasePage,
});

const benefits = [
  { title: "Predictable income", text: "Agreed monthly payouts on managed leases, or a revenue share on daily hires — paid on a fixed schedule." },
  { title: "Zero admin", text: "We handle listings, enquiries, contracts, deposits, handovers and invoicing end to end." },
  { title: "Vetted renters", text: "Every hirer is ID-verified, licence-checked and briefed before keys change hands." },
  { title: "Care and cleaning", text: "Professional cleaning between hires and servicing scheduled at approved garages." },
  { title: "Tracking and cover", text: "GPS tracking on managed vehicles and comprehensive insurance verification before every hire." },
  { title: "Transparent reporting", text: "A monthly statement showing days hired, gross revenue, deductions and your net payout." },
];

const earnings = [
  { tier: "Economy & compact", range: "$450 – $900", note: "10–18 hire days per month" },
  { tier: "Executive sedan / SUV", range: "$1,100 – $2,400", note: "12–20 hire days per month" },
  { tier: "Safari 4x4 / group van", range: "$1,500 – $3,200", note: "Peak season demand" },
];

const steps = [
  { title: "1. Apply", text: "Submit the form below with your vehicle details, logbook, insurance and photos." },
  { title: "2. Inspection", text: "We arrange a 45-minute inspection in Nairobi, Mombasa or Frankfurt — or a video walkaround." },
  { title: "3. Agreement", text: "You receive a written lease agreement with payout terms, mileage caps and notice periods." },
  { title: "4. Go live", text: "We photograph, list and start hiring your vehicle — usually within 5 working days." },
];

const eligibility = [
  "Vehicle no older than 12 years (8 years for executive categories).",
  "Valid logbook in the applicant's name, or a signed owner authorisation.",
  "Comprehensive insurance that permits commercial hire (we can help arrange this).",
  "Valid inspection certificate and clean service history.",
  "Under 200,000 km for saloons; under 250,000 km for 4x4s.",
  "No outstanding finance restrictions that prevent commercial use.",
];

const ownerDuties = [
  "Keep ownership documents, insurance and inspection current.",
  "Approve major repairs and scheduled servicing promptly.",
  "Give 30 days' notice to withdraw the vehicle from the fleet.",
  "Disclose known mechanical faults before listing.",
];

const ourDuties = [
  "Market, price and manage all bookings and customer communication.",
  "Vet every renter and hold a refundable security deposit.",
  "Clean, fuel-check and inspect the vehicle before and after each hire.",
  "Coordinate servicing, track mileage and report damage within 24 hours.",
  "Pay out on the agreed schedule with a full statement.",
];

const faqs = [
  { q: "Who pays for fuel and cleaning?", a: "Renters return vehicles with the same fuel level they collected. Cleaning between hires is on us." },
  { q: "What happens if the car is damaged?", a: "Damage is covered by the renter's deposit and the comprehensive policy. We document condition with photos at every handover and report to you within 24 hours." },
  { q: "Can I still use my car?", a: "Yes. Managed owners can block out personal dates in advance — we simply avoid taking bookings for those days." },
  { q: "How long is the agreement?", a: "The standard term is six months, renewable, with a 30-day notice period on either side." },
  { q: "Do you operate in Germany?", a: "Yes. We manage vehicles in Frankfurt, Munich and Berlin as well as across Kenya." },
];

function LeasePage() {
  const submit = useServerFn(submitLeaseApplication);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [docs, setDocs] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const values = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    values["logbook_path"] = docs["logbook"]?.[0] ?? "";
    values["insurance_path"] = docs["insurance"]?.[0] ?? "";
    values["inspection_path"] = docs["inspection"]?.[0] ?? "";
    values["photo_paths"] = docs["photos"] ?? [];
    try {
      const res = await submit({ data: values });
      setReference(res.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't submit your application.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="eyebrow">🚗 Lease your car</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
              Your car should earn while you're not driving it
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Hand us the keys and we handle everything — listing, vetting, contracts, cleaning,
              maintenance coordination and payouts. You keep ownership and receive a monthly
              statement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a href="#apply">Apply to lease your car</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/track">Track an application</Link>
              </Button>
            </div>
          </div>
        </section>

        {reference && (
          <section className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
            <div className="surface-card border-gold/40 p-6">
              <CheckCircle2 className="size-7 text-gold" />
              <h2 className="mt-3 font-display text-xl font-semibold">Application received</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your reference is{" "}
                <span className="font-semibold text-gold">{reference}</span>. Save it — you can check
                your status any time on the tracking page using this reference and your email.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <Link to="/track" search={{ ref: reference }}>
                  Track this application
                </Link>
              </Button>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow">Why owners choose us</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Benefits of leasing</h2>
          <div className="mt-8">
            <InfoList items={benefits} />
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="eyebrow">Income potential</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              What your vehicle could earn
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Indicative gross monthly ranges based on our current fleet performance. Actual earnings
              depend on category, condition, location and season.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {earnings.map((e) => (
                <div key={e.tier} className="rounded-2xl border border-border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.tier}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold text-gold">{e.range}</p>
                  <p className="mt-1 text-xs text-muted-foreground">per month · {e.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Four simple steps</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title} className="surface-card p-6">
                <h3 className="font-display text-base font-semibold text-gold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Vehicle eligibility</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {eligibility.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Owner responsibilities</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {ownerDuties.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Our responsibilities</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {ourDuties.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surface-card mt-10 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">Safety, maintenance & management</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every managed vehicle is inspected before and after each hire with a timestamped photo
              record. Servicing follows the manufacturer schedule at approved garages, and we hold a
              refundable security deposit on every rental. GPS tracking, 24/7 roadside assistance and
              a documented damage-reporting process are standard across Kenya and Germany.
            </p>
          </div>
        </section>

        <section id="apply" className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="eyebrow">Application</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Apply to lease your car
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Fields marked * are required. Documents are stored privately and only visible to our
            fleet team.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <SectionCard title="Owner details">
              <Field label="Full name" required>
                <input name="owner_name" required className={inputClass} />
              </Field>
              <Field label="Email" required>
                <input name="owner_email" type="email" required className={inputClass} />
              </Field>
              <Field label="Phone / WhatsApp" required>
                <input name="owner_phone" required className={inputClass} />
              </Field>
              <Field label="City">
                <input name="owner_city" className={inputClass} />
              </Field>
              <Field label="Country">
                <select name="owner_country" defaultValue="Kenya" className={inputClass}>
                  <option>Kenya</option>
                  <option>Germany</option>
                  <option>Other</option>
                </select>
              </Field>
            </SectionCard>

            <SectionCard title="Vehicle details">
              <Field label="Make" required>
                <input name="vehicle_make" required className={inputClass} placeholder="Toyota" />
              </Field>
              <Field label="Model" required>
                <input name="vehicle_model" required className={inputClass} placeholder="Land Cruiser Prado" />
              </Field>
              <Field label="Year">
                <input name="vehicle_year" type="number" min="1990" max="2030" className={inputClass} />
              </Field>
              <Field label="Registration">
                <input name="registration" className={inputClass} placeholder="KDA 123A" />
              </Field>
              <Field label="Mileage (km)">
                <input name="mileage_km" type="number" min="0" className={inputClass} />
              </Field>
              <Field label="Seats">
                <input name="seats" type="number" min="2" max="30" className={inputClass} />
              </Field>
              <Field label="Transmission">
                <select name="transmission" defaultValue="Automatic" className={inputClass}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </Field>
              <Field label="Fuel">
                <select name="fuel" defaultValue="Petrol" className={inputClass}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Petrol Hybrid</option>
                  <option>Electric</option>
                  <option>LPG</option>
                </select>
              </Field>
              <Field label="Insurance status">
                <input name="insurance_status" className={inputClass} placeholder="Comprehensive, expires 12/2026" />
              </Field>
              <Field label="Expected monthly income (USD)">
                <input name="expected_monthly" type="number" min="0" className={inputClass} />
              </Field>
              <Field label="Availability">
                <input name="availability" className={inputClass} placeholder="Full-time from March" />
              </Field>
              <Field label="Condition notes" className="sm:col-span-2">
                <textarea name="condition_notes" className={textareaClass} placeholder="Service history, known issues, recent work…" />
              </Field>
            </SectionCard>

            <SectionCard
              title="Documents & photos"
              description="Upload clear scans or photos (JPG, PNG or PDF, max 10 MB each)."
            >
              <FileInput
                label="Logbook"
                folder="lease/logbook"
                onChange={(p) => setDocs((d) => ({ ...d, logbook: p }))}
              />
              <FileInput
                label="Insurance certificate"
                folder="lease/insurance"
                onChange={(p) => setDocs((d) => ({ ...d, insurance: p }))}
              />
              <FileInput
                label="Inspection certificate"
                folder="lease/inspection"
                onChange={(p) => setDocs((d) => ({ ...d, inspection: p }))}
              />
              <FileInput
                label="Vehicle photos"
                folder="lease/photos"
                multiple
                hint="Front, rear, both sides, interior and dashboard."
                onChange={(p) => setDocs((d) => ({ ...d, photos: p }))}
              />
            </SectionCard>

            <SectionCard title="Anything else?">
              <Field label="Message" className="sm:col-span-2">
                <textarea name="message" className={textareaClass} placeholder="Tell us about your goals for the vehicle." />
              </Field>
            </SectionCard>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="gold" size="lg" disabled={busy}>
              {busy ? "Submitting…" : "Submit application"}
            </Button>
          </form>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <p className="eyebrow">FAQs</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Common questions</h2>
          <div className="mt-8">
            <Faqs items={faqs} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
