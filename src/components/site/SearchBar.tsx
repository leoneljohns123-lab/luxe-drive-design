import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations } from "@/data/site";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-gold/60";

export function SearchBar() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [pickup, setPickup] = useState(locations[0]?.label ?? "");
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/book", search: { pickup, start, end } });
      }}
      className="surface-card grid gap-3 p-4 sm:p-5 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-end"
    >
      <label className="min-w-0 block">
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

      <label className="min-w-0 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <CalendarDays className="size-3.5 text-gold" /> Pick-up date
        </span>
        <input
          type="date"
          className={fieldClass}
          value={start}
          min={today}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label className="min-w-0 block">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <CalendarDays className="size-3.5 text-gold" /> Return date
        </span>
        <input
          type="date"
          className={fieldClass}
          value={end}
          min={start}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">
        <Search /> Search
      </Button>
    </form>
  );
}
