import sedan from "@/assets/car-sedan.jpg";
import suv from "@/assets/car-suv.jpg";
import coupe from "@/assets/car-coupe.jpg";
import van from "@/assets/car-van.jpg";
import offroad from "@/assets/car-4x4.jpg";
import compact from "@/assets/car-compact.jpg";

export type Vehicle = {
  slug: string;
  name: string;
  tagline: string;
  category: "Luxury" | "SUV" | "Sports" | "Group" | "Adventure" | "Economy";
  pricePerDay: number;
  seats: number;
  bags: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  image: string;
  features: string[];
  description: string;
};

export const fleet: Vehicle[] = [
  {
    slug: "obsidian-executive-sedan",
    name: "Obsidian Executive Sedan",
    tagline: "Chauffeur-grade comfort for city work",
    category: "Luxury",
    pricePerDay: 180,
    seats: 4,
    bags: 3,
    transmission: "Automatic",
    fuel: "Petrol Hybrid",
    image: sedan,
    features: ["Massage rear seats", "Acoustic glass", "Wireless CarPlay", "Chauffeur optional"],
    description:
      "Our flagship saloon pairs a whisper-quiet cabin with rear-seat climate control — the default choice for airport transfers, board meetings and evening events.",
  },
  {
    slug: "alpine-white-suv",
    name: "Alpine White SUV",
    tagline: "Command the road, family in tow",
    category: "SUV",
    pricePerDay: 210,
    seats: 7,
    bags: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    image: suv,
    features: ["Panoramic roof", "Third row seating", "360° cameras", "Roof rails"],
    description:
      "Seven full-size seats, a cavernous boot and all-wheel drive confidence. Equally at home on a school run or a long-haul coastal drive.",
  },
  {
    slug: "silver-grand-tourer",
    name: "Silver Grand Tourer",
    tagline: "Long distance, short timeline",
    category: "Sports",
    pricePerDay: 265,
    seats: 4,
    bags: 2,
    transmission: "Automatic",
    fuel: "Electric",
    image: coupe,
    features: ["0–100 in 3.9s", "Adaptive dampers", "450km range", "Sport exhaust note"],
    description:
      "A fully electric grand tourer with instant torque and a cabin engineered for silence. Charging is included on rentals of three days or more.",
  },
  {
    slug: "graphite-group-van",
    name: "Graphite Group Van",
    tagline: "Move the whole party in comfort",
    category: "Group",
    pricePerDay: 240,
    seats: 8,
    bags: 8,
    transmission: "Automatic",
    fuel: "Diesel",
    image: van,
    features: ["Captain chairs", "Onboard Wi-Fi", "USB-C at every seat", "Sliding doors"],
    description:
      "Built for delegations, film crews and wedding parties. Eight seats, generous luggage space and an optional professional driver.",
  },
  {
    slug: "expedition-4x4",
    name: "Expedition 4x4",
    tagline: "Where the tarmac ends",
    category: "Adventure",
    pricePerDay: 195,
    seats: 5,
    bags: 4,
    transmission: "Manual",
    fuel: "Diesel",
    image: offroad,
    features: ["Roof tent ready", "Snorkel intake", "Recovery kit", "Dual battery"],
    description:
      "Safari-prepared and fully kitted for remote travel, with recovery gear, extra fuel capacity and satellite tracking as standard.",
  },
  {
    slug: "city-compact",
    name: "City Compact",
    tagline: "Effortless, economical, everywhere",
    category: "Economy",
    pricePerDay: 65,
    seats: 4,
    bags: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    image: compact,
    features: ["4.1L/100km", "Parking sensors", "Apple CarPlay", "Free city parking permit"],
    description:
      "Small footprint, big value. The easiest way to get around town without thinking about fuel, parking or congestion.",
  },
];

export const getVehicle = (slug: string) => fleet.find((v) => v.slug === slug);

export { whatsappLink, locations } from "./site";

export const reviews = [
  {
    name: "Amina Yusuf",
    role: "Creative Director",
    quote:
      "The sedan arrived at my hotel spotless, ten minutes early, with a driver who knew every shortcut in the city. I have not used another company since.",
    rating: 5,
  },
  {
    name: "David Mwangi",
    role: "Operations Lead, Sable Logistics",
    quote:
      "We hire the group van monthly for client visits. Billing is clean, the vehicles are consistent, and support answers on WhatsApp within minutes.",
    rating: 5,
  },
  {
    name: "Clara Bennett",
    role: "Travel Writer",
    quote:
      "Took the Expedition 4x4 through three national parks. Fully kitted, recovery gear included, and not a single issue in eleven days.",
    rating: 5,
  },
];

export const services = [
  {
    title: "Airport Transfers",
    description:
      "Flight-tracked pickups with a 60-minute free wait window and meet-and-greet at arrivals.",
    icon: "plane",
  },
  {
    title: "Chauffeur Hire",
    description:
      "Vetted professional drivers, hourly or full-day, briefed on your itinerary before arrival.",
    icon: "user",
  },
  {
    title: "Corporate Accounts",
    description:
      "Consolidated monthly invoicing, priority allocation and negotiated long-term rates.",
    icon: "briefcase",
  },
  {
    title: "Wedding & Events",
    description: "Matched vehicle sets, ribbon detailing and coordinated timing for the day.",
    icon: "sparkles",
  },
  {
    title: "Long-Term Leasing",
    description:
      "Thirty days and beyond, with servicing, insurance and replacement vehicles included.",
    icon: "calendar",
  },
  {
    title: "Safari & Expedition",
    description: "Park-ready 4x4s with recovery kit, satellite tracking and route planning support.",
    icon: "mountain",
  },
];
