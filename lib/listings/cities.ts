export type CityOption = { value: string; label: string }

// Curated, not exhaustive — major cities per country, keyed by the exact
// `value` used in lib/listings/countries.ts. Morocco (primary market) gets
// full coverage; other countries get a handful of major cities. Sellers who
// can't find their city can pick "Other" and type it in (see
// ComboboxWithOther) — that option is always offered regardless of country.
export const CITIES_BY_COUNTRY: Record<string, readonly CityOption[]> = {
  Morocco: [
    "Casablanca",
    "Rabat",
    "Fes",
    "Marrakesh",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
    "Safi",
    "El Jadida",
    "Nador",
    "Errachidia",
    "Beni Mellal",
    "Khouribga",
    "Settat",
    "Larache",
    "Khemisset",
    "Guelmim",
    "Berrechid",
    "Ouarzazate",
    "Essaouira",
    "Ifrane",
    "Al Hoceima",
    "Chefchaouen",
    "Taza",
    "Taroudant",
    "Dakhla",
    "Laayoune",
  ].map((c) => ({ value: c, label: c })),
  France: ["Paris", "Marseille", "Lyon", "Nice", "Toulouse"].map((c) => ({
    value: c,
    label: c,
  })),
  "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh"].map(
    (c) => ({ value: c, label: c })
  ),
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Malaga"].map((c) => ({
    value: c,
    label: c,
  })),
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"].map(
    (c) => ({ value: c, label: c })
  ),
  Italy: ["Rome", "Milan", "Naples", "Turin", "Florence"].map((c) => ({
    value: c,
    label: c,
  })),
  Portugal: ["Lisbon", "Porto", "Faro"].map((c) => ({ value: c, label: c })),
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"].map(
    (c) => ({ value: c, label: c })
  ),
  Belgium: ["Brussels", "Antwerp", "Ghent"].map((c) => ({
    value: c,
    label: c,
  })),
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern"].map((c) => ({
    value: c,
    label: c,
  })),
  Ireland: ["Dublin", "Cork", "Galway"].map((c) => ({ value: c, label: c })),
  Sweden: ["Stockholm", "Gothenburg", "Malmo"].map((c) => ({
    value: c,
    label: c,
  })),
  Norway: ["Oslo", "Bergen"].map((c) => ({ value: c, label: c })),
  Denmark: ["Copenhagen", "Aarhus"].map((c) => ({ value: c, label: c })),
  Austria: ["Vienna", "Salzburg", "Graz"].map((c) => ({
    value: c,
    label: c,
  })),
  Poland: ["Warsaw", "Krakow", "Wroclaw"].map((c) => ({
    value: c,
    label: c,
  })),
  Greece: ["Athens", "Thessaloniki"].map((c) => ({ value: c, label: c })),
  Turkey: ["Istanbul", "Ankara", "Izmir", "Antalya"].map((c) => ({
    value: c,
    label: c,
  })),
  Russia: ["Moscow", "Saint Petersburg"].map((c) => ({
    value: c,
    label: c,
  })),
  "United States": [
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "Houston",
    "San Francisco",
  ].map((c) => ({ value: c, label: c })),
  Canada: ["Toronto", "Montreal", "Vancouver", "Ottawa"].map((c) => ({
    value: c,
    label: c,
  })),
  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Cancun"].map((c) => ({
    value: c,
    label: c,
  })),
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia"].map((c) => ({
    value: c,
    label: c,
  })),
  Argentina: ["Buenos Aires", "Cordoba"].map((c) => ({
    value: c,
    label: c,
  })),
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah"].map((c) => ({
    value: c,
    label: c,
  })),
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina"].map((c) => ({
    value: c,
    label: c,
  })),
  Qatar: ["Doha"].map((c) => ({ value: c, label: c })),
  Kuwait: ["Kuwait City"].map((c) => ({ value: c, label: c })),
  Bahrain: ["Manama"].map((c) => ({ value: c, label: c })),
  Egypt: ["Cairo", "Alexandria", "Giza"].map((c) => ({
    value: c,
    label: c,
  })),
  Tunisia: ["Tunis", "Sfax", "Sousse"].map((c) => ({ value: c, label: c })),
  Algeria: ["Algiers", "Oran", "Constantine"].map((c) => ({
    value: c,
    label: c,
  })),
  Nigeria: ["Lagos", "Abuja"].map((c) => ({ value: c, label: c })),
  "South Africa": ["Johannesburg", "Cape Town", "Durban"].map((c) => ({
    value: c,
    label: c,
  })),
  Kenya: ["Nairobi", "Mombasa"].map((c) => ({ value: c, label: c })),
  India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"].map((c) => ({
    value: c,
    label: c,
  })),
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"].map((c) => ({
    value: c,
    label: c,
  })),
  Japan: ["Tokyo", "Osaka", "Kyoto"].map((c) => ({ value: c, label: c })),
  "South Korea": ["Seoul", "Busan"].map((c) => ({ value: c, label: c })),
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth"].map((c) => ({
    value: c,
    label: c,
  })),
  "New Zealand": ["Auckland", "Wellington"].map((c) => ({
    value: c,
    label: c,
  })),
  Indonesia: ["Jakarta", "Bali (Denpasar)", "Surabaya"].map((c) => ({
    value: c,
    label: c,
  })),
  Thailand: ["Bangkok", "Phuket", "Chiang Mai"].map((c) => ({
    value: c,
    label: c,
  })),
  Vietnam: ["Ho Chi Minh City", "Hanoi"].map((c) => ({
    value: c,
    label: c,
  })),
  Philippines: ["Manila", "Cebu City"].map((c) => ({
    value: c,
    label: c,
  })),
  Singapore: ["Singapore"].map((c) => ({ value: c, label: c })),
  Malaysia: ["Kuala Lumpur", "Penang"].map((c) => ({
    value: c,
    label: c,
  })),
}
