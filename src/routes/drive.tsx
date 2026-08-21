import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Field, Faqs, InfoList, SectionCard, inputClass, textareaClass } from "@/components/site/form-bits";
import { FileInput } from "@/components/site/FileInput";
import { submitDriverApplication } from "@/lib/applications.functions";
import { BRAND } from "@/data/site";

export const Route = createFileRoute("/drive")({
  head: () => ({
    meta: [
      { title: `Become a Driver — Join Our Chauffeur Team | ${BRAND.name}` },
      {
        name: "description",
        content:
          "Drive with Dama Royal Safaris in Kenya and Germany. Flexible shifts, reliable weekly pay, premium vehicles and full support. Apply online in minutes.",
      },
      { property: "og:title", content: `Become a Driver | ${BRAND.name}` },
      {
        property: "og:description",
        content: "Flexible shifts, weekly pay and premium vehicles. Apply to drive with us.",
      },
    ],
  }),
  component: DrivePage,
});

const perks = [
  { title: "Reliable weekly pay", text: "Payouts every Friday with a clear breakdown of trips, hours and tips." },
  { title: "Choose your shifts", text: "Day, night, weekend or airport-only rotations — set your availability each week." },
  { title: "Premium vehicles", text: "Drive a serviced, insured and immaculately presented fleet, fuelled and cleaned for you." },
  { title: "Airport priority", text: "Regular flight-tracked transfers at JKIA, Moi, Frankfurt and Munich." },
  { title: "Training included", text: "Defensive driving, guest etiquette and safari route briefings at no cost." },
  { title: "Grow with us", text: "Top-rated drivers move into lead chauffeur, safari guide and dispatch roles." },
];

const earnings = [
  { tier: "City & airport transfers", range: "KSh 45,000 – 80,000", note: "per month, full-time" },
  { tier: "Executive chauffeur", range: "KSh 70,000 – 120,000", note: "per month, incl. tips" },
  { tier: "Safari expedition driver", range: "KSh 4,500 – 8,000", note: "per day on tour" },
];

const requirements = [
  "Minimum 3 years' professional driving experience (5 for safari routes).",
  "Valid driving licence, class B/BE or equivalent, held for at least 3 years.",
  "Clean driving record and a valid certificate of good conduct.",
  "Fluent English; Kiswahili or German a strong advantage.",
  "Smartphone with data for dispatch and navigation.",
  "Smart presentation and strong customer service manner.",
];

const documents = [
  "Driving licence (front and back)",
  "National ID or passport",
  "Certificate of good conduct / police clearance",
  "CV with contactable references",
  "Recent passport-style photo",
];

const process = [
  { title: "1. Apply online", text: "Complete the form below with your licence, experience and documents." },
  { title: "2. Screening", text: "We verify your licence and references — usually within 3 working days." },
  { title: "3. Road test", text: "A practical assessment plus a short interview at your nearest hub." },
  { title: "4. Onboarding", text: "Kit, training, app access and your first roster within a week." },
];

const duties = [
  "Arrive early, presentable and with the vehicle clean and fuelled.",
  "Follow all traffic laws, speed limits and rest-period requirements.",
  "Complete pre- and post-trip vehicle checks in the driver app.",
  "Report incidents, damage or mechanical concerns immediately.",
  "Maintain guest confidentiality and a professional manner at all times.",
];

const faqs = [
  { q: "Do I need my own vehicle?", a: "No. We assign a fleet vehicle for every shift. If you do own a suitable vehicle, tell us in the form — you may qualify for our owner-driver programme." },
  { q: "How soon can I start?", a: "Most successful applicants complete screening, road test and onboarding within 7–10 days." },
  { q: "Is part-time possible?", a: "Yes. Many of our drivers work weekend or evening rotations only." },
  { q: "Do you hire in Germany?", a: "Yes — we recruit chauffeurs in Frankfurt, Munich and Berlin. A German or EU licence and work authorisation are required." },
  { q: "Who pays for fuel and cleaning?", a: "We do, on all company-assigned vehicles." },
];

const vehicleTypeOptions = ["Sedan", "SUV", "4x4 / Safari", "Van / Minibus", "Executive / VIP", "Electric"];

function DrivePage() {
  const submit = useServerFn(submitDriverApplication);
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
    values["vehicle_types"] = fd.getAll("vehicle_types");
    values["has_own_vehicle"] = fd.get("has_own_vehicle") === "on";
    values["licence_path"] = docs["licence"]?.[0] ?? "";
    values["id_path"] = docs["id"]?.[0] ?? "";
    values["good_conduct_path"] = docs["conduct"]?.[0] ?? "";
    values["cv_path"] = docs["cv"]?.[0] ?? "";
    values["photo_path"] = docs["photo"]?.[0] ?? "";
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
            <p className="eyebrow">👤 Become a driver</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
              Drive premium. Get paid properly.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Join a chauffeur team trusted by executives, families and safari guests across Kenya
              and Germany. Flexible rosters, well-maintained vehicles and pay that lands on time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a href="#apply">Apply to drive</a>
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
                Your reference is <span className="font-semibold text-gold">{reference}</span>. Keep
                it safe — you can check progress any time with this reference and your email.
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
          <p className="eyebrow">Driver benefits</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Perks of the seat</h2>
          <div className="mt-8">
            <InfoList items={perks} />
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="eyebrow">Earning potential</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What drivers earn</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Indicative ranges for Kenya-based drivers. German rotations are quoted separately at
              local market rates.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {earnings.map((e) => (
                <div key={e.tier} className="rounded-2xl border border-border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {e.tier}
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold text-gold">{e.range}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{e.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow">Application process</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From apply to first shift</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <div key={s.title} className="surface-card p-6">
                <h3 className="font-display text-base font-semibold text-gold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Driver requirements</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {requirements.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Required documents</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {documents.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-card p-6">
              <h3 className="font-display text-lg font-semibold">Driver responsibilities</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {duties.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="apply" className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="eyebrow">Application</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Driver application form</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Fields marked * are required. Your documents are stored privately and reviewed only by
            our recruitment team.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <SectionCard title="Personal details">
              <Field label="Full name" required>
                <input name="full_name" required className={inputClass} />
              </Field>
              <Field label="Email" required>
                <input name="email" type="email" required className={inputClass} />
              </Field>
              <Field label="Phone / WhatsApp" required>
                <input name="phone" required className={inputClass} />
              </Field>
              <Field label="Date of birth">
                <input name="date_of_birth" type="date" className={inputClass} />
              </Field>
              <Field label="City">
                <input name="city" className={inputClass} placeholder="Nairobi" />
              </Field>
              <Field label="Country">
                <select name="country" defaultValue="Kenya" className={inputClass}>
                  <option>Kenya</option>
                  <option>Germany</option>
                  <option>Other</option>
                </select>
              </Field>
            </SectionCard>

            <SectionCard title="Licence & experience">
              <Field label="Licence number" required>
                <input name="licence_number" required className={inputClass} />
              </Field>
              <Field label="Licence class">
                <input name="licence_class" className={inputClass} placeholder="B / BE" />
              </Field>
              <Field label="Licence expiry">
                <input name="licence_expiry" type="date" className={inputClass} />
              </Field>
              <Field label="Years of experience">
                <input name="years_experience" type="number" min="0" max="60" className={inputClass} />
              </Field>
              <Field label="Languages spoken">
                <input name="languages" className={inputClass} placeholder="English, Kiswahili, German" />
              </Field>
              <Field label="Own a vehicle?">
                <label className="flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm">
                  <input type="checkbox" name="has_own_vehicle" className="accent-[var(--gold)]" />
                  Yes, I own a suitable vehicle
                </label>
              </Field>
              <Field label="Vehicle types you can drive" className="sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {vehicleTypeOptions.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        name="vehicle_types"
                        value={t}
                        className="accent-[var(--gold)]"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Experience summary" className="sm:col-span-2">
                <textarea
                  name="experience_notes"
                  className={textareaClass}
                  placeholder="Previous employers, routes driven, VIP or safari experience…"
                />
              </Field>
            </SectionCard>

            <SectionCard title="Availability">
              <Field label="Availability">
                <select name="availability" defaultValue="Full-time" className={inputClass}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Weekends only</option>
                  <option>On call</option>
                </select>
              </Field>
              <Field label="Preferred hours">
                <select name="preferred_hours" defaultValue="Daytime" className={inputClass}>
                  <option>Daytime</option>
                  <option>Evenings</option>
                  <option>Nights</option>
                  <option>Flexible</option>
                </select>
              </Field>
            </SectionCard>

            <SectionCard
              title="Documents"
              description="Upload clear scans or photos (JPG, PNG or PDF, max 10 MB each)."
            >
              <FileInput
                label="Driving licence"
                folder="driver/licence"
                onChange={(p) => setDocs((d) => ({ ...d, licence: p }))}
              />
              <FileInput
                label="National ID / passport"
                folder="driver/id"
                onChange={(p) => setDocs((d) => ({ ...d, id: p }))}
              />
              <FileInput
                label="Certificate of good conduct"
                folder="driver/conduct"
                onChange={(p) => setDocs((d) => ({ ...d, conduct: p }))}
              />
              <FileInput
                label="CV"
                folder="driver/cv"
                onChange={(p) => setDocs((d) => ({ ...d, cv: p }))}
              />
              <FileInput
                label="Passport photo"
                folder="driver/photo"
                onChange={(p) => setDocs((d) => ({ ...d, photo: p }))}
              />
            </SectionCard>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="gold" size="lg" disabled={busy}>
              {busy ? "Submitting…" : "Submit application"}
            </Button>
          </form>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <p className="eyebrow">FAQs</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Driver questions</h2>
          <div className="mt-8">
            <Faqs items={faqs} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
