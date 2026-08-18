import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Location } from "@/data/site";

function pinIcon(active: boolean) {
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<span style="display:block;width:22px;height:22px;border-radius:9999px;border:2px solid rgba(0,0,0,.55);background:${
      active ? "#f0c674" : "#c9a227"
    };box-shadow:0 0 0 ${active ? "8px rgba(240,198,116,.28)" : "4px rgba(201,162,39,.18)"};"></span>`,
  });
}

export default function LocationsMap({
  items,
  selected,
  onSelect,
}: {
  items: Location[];
  selected: string | null;
  onSelect: (label: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 18,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // Rebuild markers when the filtered set changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    items.forEach((l) => {
      const marker = L.marker([l.lat, l.lng], {
        icon: pinIcon(false),
        title: l.label,
        keyboard: true,
        alt: l.label,
      })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px">
             <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#c9a227">${l.country} · ${l.type}</div>
             <div style="font-weight:700;margin-top:4px">${l.label}</div>
             <div style="margin-top:4px;color:#666">${l.address}</div>
             <div style="margin-top:2px;color:#666">${l.hours}</div>
           </div>`,
        )
        .on("click", () => onSelect(l.label));
      markersRef.current[l.label] = marker;
    });

    if (items.length > 0) {
      map.fitBounds(
        L.latLngBounds(items.map((l) => [l.lat, l.lng] as [number, number])).pad(0.15),
      );
    }
  }, [items, onSelect]);

  // Highlight + focus the selected pin.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    Object.entries(markersRef.current).forEach(([label, marker]) => {
      marker.setIcon(pinIcon(label === selected));
    });
    if (selected) {
      const marker = markersRef.current[selected];
      if (marker) {
        map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 9), { duration: 0.6 });
        marker.openPopup();
      }
    }
  }, [selected]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Map of pick-up locations in Kenya and Germany"
      className="h-[320px] w-full overflow-hidden rounded-2xl border border-border sm:h-[460px]"
    />
  );
}
