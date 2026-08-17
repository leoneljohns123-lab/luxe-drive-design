import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, CONTACT } from "@/data/site";

const nav = [
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/locations", label: "Locations" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Book" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold text-primary-foreground font-display text-sm font-bold">
            DR
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-bold tracking-tight">
              {BRAND.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Car Hire
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Reserve now</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 xl:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-surface-raised hover:text-foreground"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACT.phones[0]?.href}`}
            className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground"
          >
            <Phone className="size-4" /> {CONTACT.phones[0]?.number}
          </a>
        </nav>
      )}
    </header>
  );
}
