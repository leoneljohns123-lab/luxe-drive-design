import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Car, ChevronDown, ChevronRight, Headphones, HelpCircle, ShieldCheck, X } from "lucide-react";
import crest from "@/assets/crest.png.asset.json";
import { BRAND, whatsappLink } from "@/data/site";

const options = [
  {
    icon: Car,
    title: "Book a Car",
    subtitle: "Find and book your perfect car",
    to: "/book" as const,
  },
  {
    icon: HelpCircle,
    title: "Ask a Question",
    subtitle: "We're here to help",
    to: "/contact" as const,
  },
  {
    icon: Headphones,
    title: "Customer Support",
    subtitle: "Speak with our team",
    to: "/contact" as const,
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6">
      {open ? (
        <div className="overflow-hidden rounded-3xl border border-gold/30 bg-surface shadow-soft">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
            <img
              src={crest.url}
              alt=""
              className="size-9 shrink-0 rounded-full border border-gold/40 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold">{BRAND.name}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-gold">
                <span className="size-1.5 rounded-full bg-gold" /> Online
              </p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="grid size-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="px-4 pb-4 pt-4">
            <p className="font-display text-lg font-bold">Hi there! 👋</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Welcome to {BRAND.name}. How can we help you today?
            </p>

            <div className="mt-4 space-y-2">
              {options.map((o) => (
                <Link
                  key={o.title}
                  to={o.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface-raised px-3 py-3 transition-colors hover:border-gold/40"
                >
                  <o.icon className="size-4 shrink-0 text-gold" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{o.title}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {o.subtitle}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <a
              href={whatsappLink(`Hello ${BRAND.name}, I'd like to enquire about a vehicle hire.`)}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 block rounded-2xl bg-gold px-4 py-3 text-center text-primary-foreground"
            >
              <span className="block text-sm font-bold">Start Chat on WhatsApp</span>
              <span className="block text-[11px] opacity-80">
                We typically reply in a few minutes
              </span>
            </a>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <ShieldCheck className="size-3" /> Your data is secure with us
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-full border border-gold/30 bg-surface px-3 py-2.5 text-left shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
        >
          <img
            src={crest.url}
            alt=""
            className="size-9 shrink-0 rounded-full border border-gold/40 object-cover"
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-sm font-bold">{BRAND.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-gold">
              <span className="size-1.5 rounded-full bg-gold" /> Online
            </span>
          </span>
          <ChevronDown className="size-4 shrink-0 rotate-180 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
