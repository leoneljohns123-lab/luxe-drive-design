import { Link } from "@tanstack/react-router";
import { ArrowRight, CarFront, KeyRound, UserRound } from "lucide-react";

const ctas = [
  {
    to: "/book" as const,
    icon: CarFront,
    emoji: "🚘",
    title: "Book a Car",
    text: "Self-drive or chauffeured hire across Kenya and Germany, delivered to you.",
    action: "Start a booking",
  },
  {
    to: "/lease" as const,
    icon: KeyRound,
    emoji: "🚗",
    title: "Lease Your Car",
    text: "Put your vehicle on our fleet and earn while we handle rentals end to end.",
    action: "Apply to lease",
  },
  {
    to: "/drive" as const,
    icon: UserRound,
    emoji: "👤",
    title: "Become a Driver",
    text: "Drive with a premium brand on flexible shifts with reliable weekly pay.",
    action: "Apply to drive",
  },
];

export function CtaTrio({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ctas.map((c) => (
        <Link
          key={c.to}
          to={c.to}
          className="surface-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/45"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-lg">
            <span aria-hidden>{c.emoji}</span>
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
          {!compact && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
            {c.action}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
