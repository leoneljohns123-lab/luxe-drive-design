import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND, CONTACT, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Dama Royal Safaris — Kenya & Germany Car Hire" },
      {
        name: "description",
        content:
          "Call, email or WhatsApp our team in Kenya and Germany. We reply within minutes, every day of the week.",
      },
      { property: "og:title", content: "Contact Dama Royal Safaris" },
      {
        property: "og:description",
        content: "Reach our Kenya and Germany desks by phone, WhatsApp or email.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Talk to a real person</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Our team operates across Kenya and Germany. Whichever line you use, you reach the same
          people who prepare and deliver your vehicle.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Call or WhatsApp</h2>
            <ul className="mt-4 space-y-4">
              {CONTACT.phones.map((p) => (
                <li key={p.href}>
                  <p className="text-xs text-muted-foreground">{p.label}</p>
                  <a
                    href={`tel:${p.href}`}
                    className="flex items-center gap-2 text-sm font-semibold hover:text-gold"
                  >
                    <Phone className="size-4 shrink-0 text-gold" /> {p.number}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="whatsapp" className="mt-6 w-full">
              <a
                href={whatsappLink(`Hello ${BRAND.name}, I have a question about car hire.`)}
                target="_blank"
                rel="noreferrer noopener"
              >
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Email & offices</h2>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-4 flex items-start gap-2 break-all text-sm hover:text-gold"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" /> {CONTACT.email}
            </a>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> Westlands, Nairobi, Kenya
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> Bahnhofsviertel, Frankfurt am
              Main, Germany
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" /> WhatsApp answered 24/7; office
              calls 07:00 – 21:00 local time.
            </p>
          </div>
        </div>

        <form
          className="surface-card mt-6 grid gap-4 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
            window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
              "Enquiry from the website",
            )}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h2 className="font-display text-lg font-semibold">Send a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold/60"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-gold/60"
            />
          </div>
          <textarea
            name="message"
            required
            placeholder="How can we help?"
            className="min-h-32 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-gold/60"
          />
          <Button type="submit" variant="gold" size="lg" className="justify-self-start">
            <Mail /> Send email
          </Button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
