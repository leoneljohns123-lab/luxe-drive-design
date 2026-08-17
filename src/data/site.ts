export const BRAND = {
  name: "Dama Royal Safaris",
  tagline: "Where Comfort Meets the Road",
};

export const CONTACT = {
  email: "damaris.ngombafaulstich@gmail.com",
  whatsappKenya: "254716576767",
  whatsappInternational: "491727442048",
  phones: [
    { label: "Germany (WhatsApp & calls)", number: "+49 172 744 2048", href: "+491727442048" },
    { label: "Kenya (WhatsApp & calls)", number: "+254 716 576 767", href: "+254716576767" },
    { label: "Kenya (calls)", number: "+254 720 550 748", href: "+254720550748" },
  ],
};

/** Kenyan visitors reach the Kenya line; everyone else the German line. */
export function isInKenya() {
  if (typeof Intl === "undefined") return false;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return tz === "Africa/Nairobi" || tz === "Africa/Kampala" || tz === "Africa/Dar_es_Salaam";
  } catch {
    return false;
  }
}

export function whatsappNumber() {
  return isInKenya() ? CONTACT.whatsappKenya : CONTACT.whatsappInternational;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

export type Location = {
  country: "Kenya" | "Germany";
  city: string;
  label: string;
  type: "Airport" | "City" | "Town";
  address: string;
  hours: string;
  note: string;
};

export const locations: Location[] = [
  // Kenya — airports
  {
    country: "Kenya",
    city: "Nairobi",
    label: "Jomo Kenyatta International Airport (NBO)",
    type: "Airport",
    address: "Terminal 1A Arrivals, Embakasi",
    hours: "Open 24 hours",
    note: "Meet-and-greet delivery straight to arrivals, flight tracked.",
  },
  {
    country: "Kenya",
    city: "Nairobi",
    label: "Wilson Airport (WIL)",
    type: "Airport",
    address: "Langata Road, Nairobi",
    hours: "05:30 – 21:00 daily",
    note: "Ideal connection point for safari charter flights.",
  },
  {
    country: "Kenya",
    city: "Mombasa",
    label: "Moi International Airport (MBA)",
    type: "Airport",
    address: "Port Reitz, Mombasa",
    hours: "Open 24 hours",
    note: "Coastal fleet with convertibles, SUVs and 4x4s.",
  },
  {
    country: "Kenya",
    city: "Kisumu",
    label: "Kisumu International Airport (KIS)",
    type: "Airport",
    address: "Airport Road, Kisumu",
    hours: "06:00 – 20:00 daily",
    note: "Western Kenya hub for long-distance hires.",
  },
  {
    country: "Kenya",
    city: "Eldoret",
    label: "Eldoret International Airport (EDL)",
    type: "Airport",
    address: "Eldoret–Kisumu Road",
    hours: "06:00 – 19:00 daily",
    note: "Rift Valley pick-ups and highland transfers.",
  },
  {
    country: "Kenya",
    city: "Malindi",
    label: "Malindi Airport (MYD)",
    type: "Airport",
    address: "Malindi Town",
    hours: "07:00 – 18:00 daily",
    note: "Beach hires and north coast transfers.",
  },
  {
    country: "Kenya",
    city: "Ukunda",
    label: "Ukunda / Diani Airstrip (UKA)",
    type: "Airport",
    address: "Diani Beach Road",
    hours: "07:00 – 18:00 daily",
    note: "Diani beach delivery included.",
  },
  {
    country: "Kenya",
    city: "Lamu",
    label: "Manda Airport (LAU)",
    type: "Airport",
    address: "Manda Island",
    hours: "07:00 – 17:00 daily",
    note: "Boat-assisted transfer arranged on request.",
  },
  {
    country: "Kenya",
    city: "Maasai Mara",
    label: "Keekorok & Ol Kiombo Airstrips",
    type: "Airport",
    address: "Maasai Mara National Reserve",
    hours: "Daylight hours",
    note: "Safari-prepared 4x4s with guides available.",
  },
  // Kenya — cities & towns
  {
    country: "Kenya",
    city: "Nairobi",
    label: "Westlands Flagship Office",
    type: "City",
    address: "Muthithi Road, Westlands",
    hours: "Open 24 hours",
    note: "Full fleet availability and same-day delivery.",
  },
  {
    country: "Kenya",
    city: "Mombasa",
    label: "Nyali Coast Branch",
    type: "City",
    address: "Links Road, Nyali",
    hours: "07:00 – 21:00 daily",
    note: "Free delivery within Mombasa Island and Nyali.",
  },
  {
    country: "Kenya",
    city: "Nakuru",
    label: "Nakuru Town Desk",
    type: "Town",
    address: "Kenyatta Avenue, Nakuru",
    hours: "07:00 – 19:00 daily",
    note: "Gateway to Lake Nakuru and the Rift Valley parks.",
  },
  {
    country: "Kenya",
    city: "Naivasha",
    label: "Naivasha Lakeside Point",
    type: "Town",
    address: "Moi South Lake Road",
    hours: "07:00 – 19:00 daily",
    note: "Weekend hires and Hell's Gate day trips.",
  },
  {
    country: "Kenya",
    city: "Nanyuki",
    label: "Nanyuki Highlands Point",
    type: "Town",
    address: "Nanyuki Town Centre",
    hours: "07:00 – 18:00 daily",
    note: "Mount Kenya and Laikipia conservancy access.",
  },
  {
    country: "Kenya",
    city: "Diani",
    label: "Diani Beach Delivery",
    type: "Town",
    address: "Diani Beach Road, Kwale",
    hours: "07:00 – 20:00 daily",
    note: "Hotel-to-hotel delivery along the south coast.",
  },
  {
    country: "Kenya",
    city: "Kisumu",
    label: "Kisumu Lakeside Depot",
    type: "City",
    address: "Oginga Odinga Street",
    hours: "07:00 – 19:00 daily",
    note: "Regional hub for long-distance and safari hires.",
  },
  // Germany — airports
  {
    country: "Germany",
    city: "Frankfurt",
    label: "Frankfurt Airport (FRA)",
    type: "Airport",
    address: "Terminal 1, Ankunft",
    hours: "Open 24 hours",
    note: "Our main German gateway — flight-tracked handover.",
  },
  {
    country: "Germany",
    city: "Munich",
    label: "Munich Airport (MUC)",
    type: "Airport",
    address: "Terminal 2 Arrivals",
    hours: "05:00 – 23:30 daily",
    note: "Bavaria and Alpine road trip specialists.",
  },
  {
    country: "Germany",
    city: "Berlin",
    label: "Berlin Brandenburg Airport (BER)",
    type: "Airport",
    address: "Terminal 1, Willy-Brandt-Platz",
    hours: "Open 24 hours",
    note: "Capital region delivery within 60 minutes.",
  },
  {
    country: "Germany",
    city: "Düsseldorf",
    label: "Düsseldorf Airport (DUS)",
    type: "Airport",
    address: "Ankunftsebene, Flughafenstraße",
    hours: "05:30 – 23:00 daily",
    note: "Business hires for the Rhine-Ruhr region.",
  },
  {
    country: "Germany",
    city: "Hamburg",
    label: "Hamburg Airport (HAM)",
    type: "Airport",
    address: "Terminal 2 Arrivals",
    hours: "05:30 – 23:00 daily",
    note: "Northern Germany and Baltic coast routes.",
  },
  {
    country: "Germany",
    city: "Cologne",
    label: "Cologne Bonn Airport (CGN)",
    type: "Airport",
    address: "Terminal 1 Arrivals",
    hours: "06:00 – 22:00 daily",
    note: "Convenient for Cologne, Bonn and the Eifel.",
  },
  {
    country: "Germany",
    city: "Stuttgart",
    label: "Stuttgart Airport (STR)",
    type: "Airport",
    address: "Terminal 3 Arrivals",
    hours: "06:00 – 22:00 daily",
    note: "Black Forest and Swabian Alb touring cars.",
  },
  {
    country: "Germany",
    city: "Nuremberg",
    label: "Nuremberg Airport (NUE)",
    type: "Airport",
    address: "Flughafenstraße 100",
    hours: "06:00 – 21:00 daily",
    note: "Franconia region pick-ups.",
  },
  // Germany — cities & towns
  {
    country: "Germany",
    city: "Frankfurt",
    label: "Frankfurt City Desk",
    type: "City",
    address: "Bahnhofsviertel, near Hauptbahnhof",
    hours: "07:00 – 20:00 daily",
    note: "Walk-in collection beside the main station.",
  },
  {
    country: "Germany",
    city: "Munich",
    label: "Munich City Delivery",
    type: "City",
    address: "Maxvorstadt, München",
    hours: "07:00 – 20:00 daily",
    note: "Free delivery within the Mittlerer Ring.",
  },
  {
    country: "Germany",
    city: "Berlin",
    label: "Berlin Mitte Point",
    type: "City",
    address: "Torstraße, Berlin-Mitte",
    hours: "07:00 – 20:00 daily",
    note: "Hotel and apartment delivery across Berlin.",
  },
  {
    country: "Germany",
    city: "Wiesbaden",
    label: "Wiesbaden Town Point",
    type: "Town",
    address: "Wilhelmstraße, Wiesbaden",
    hours: "08:00 – 18:00 Mon–Sat",
    note: "Rhine valley and Taunus excursions.",
  },
  {
    country: "Germany",
    city: "Heidelberg",
    label: "Heidelberg Old Town Point",
    type: "Town",
    address: "Bergheimer Straße, Heidelberg",
    hours: "08:00 – 18:00 Mon–Sat",
    note: "Castle road and Neckar valley touring.",
  },
  {
    country: "Germany",
    city: "Hanover",
    label: "Hanover City Point",
    type: "City",
    address: "Nordstadt, Hannover",
    hours: "08:00 – 19:00 daily",
    note: "Trade fair and business hires.",
  },
];

export const kenyaLocations = locations.filter((l) => l.country === "Kenya");
export const germanyLocations = locations.filter((l) => l.country === "Germany");
