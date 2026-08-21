import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png.asset.json";
import { CONTACT } from "@/data/site";

const nav = [
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/lease", label: "Lease your car" },
  { to: "/drive", label: "Become a driver" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center">
          <img
            src={logo.url}
            alt="Dama Royal Safaris — Where Comfort Meets the Road"
            className="h-11 w-auto max-w-[220px] object-contain sm:h-12 sm:max-w-[280px]"
          />
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 lg:hidden">
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
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-sm font-semibold text-gold"
          >
            Reserve now
          </Link>
          {CONTACT.phones.slice(0, 2).map((p) => (
            <a
              key={p.href}
              href={`tel:${p.href}`}
              className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground"
            >
              <Phone className="size-4" /> {p.number}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
