import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND, CONTACT } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold text-primary-foreground font-display text-sm font-bold">
              DR
            </span>
            <span className="font-display text-base font-bold">{BRAND.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Premium vehicle hire across Kenya and Germany with transparent pricing, meticulous preparation and around-the-clock support. Delivered wherever you are.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/fleet" className="hover:text-gold">Our fleet</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/locations" className="hover:text-gold">Locations</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/book" className="hover:text-gold">Start a booking</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {CONTACT.phones.map((p) => (
              <li key={p.href} className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`tel:${p.href}`} className="hover:text-gold">{p.number}</a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-gold">{CONTACT.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>Westlands, Nairobi · Frankfurt am Main</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}
