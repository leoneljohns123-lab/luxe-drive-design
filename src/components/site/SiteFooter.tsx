import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND, CONTACT } from "@/data/site";

const explore = [
  { to: "/fleet", label: "Our fleet" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/locations", label: "Locations" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Start a booking" },
  { to: "/lease", label: "Lease your car" },
  { to: "/drive", label: "Become a driver" },
  { to: "/track", label: "Track an application" },
] as const;


export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1.1fr] lg:px-8">
        <div className="min-w-0">
          <img
            src={logo.url}
            alt={`${BRAND.name} — ${BRAND.tagline}`}
            className="h-12 w-auto max-w-[260px] object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Premium car hire and safari transport across Kenya and Germany — transparent pricing,
            meticulous preparation and around-the-clock support, delivered wherever you are.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {explore.map((e) => (
              <li key={e.to}>
                <Link to={e.to} className="hover:text-gold">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {CONTACT.phones.map((p) => (
              <li key={p.href} className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`tel:${p.href}`} className="hover:text-gold">
                  {p.number}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-gold">
                {CONTACT.email}
              </a>
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
