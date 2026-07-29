// Thin client for the Stall NestJS API, with graceful fallback to seed
// data so the site still renders content during local design work even
// if the API isn't running yet.

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};

export type Business = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  coverEmoji: string;
  category: Category;
  distanceKm?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      // Website + API are separate deploys; always get fresh data.
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // API unreachable (not started yet, or offline design work) — fall
    // back to seed-shaped data so pages still render.
    return fallback;
  }
}

export function getCategories() {
  return safeFetch<Category[]>("/categories", FALLBACK_CATEGORIES);
}

export function getBusinesses(params?: {
  search?: string;
  category?: string;
}) {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("search", params.search);
  if (params?.category) qs.set("category", params.category);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return safeFetch<Business[]>(`/businesses${suffix}`, FALLBACK_BUSINESSES);
}

export async function getBusiness(slug: string) {
  return safeFetch<Business | null>(
    `/businesses/${slug}`,
    FALLBACK_BUSINESSES.find((b) => b.slug === slug) ?? null,
  );
}

// --- Fallback/demo data (mirrors packages/database/prisma/seed.ts) ---

const FALLBACK_CATEGORIES: Category[] = [
  { id: "1", name: "Flowers", slug: "flowers", icon: "💐" },
  { id: "2", name: "Salon", slug: "salon", icon: "✂️" },
  { id: "3", name: "Tailor", slug: "tailor", icon: "🧵" },
  { id: "4", name: "Grocery", slug: "grocery", icon: "🛒" },
  { id: "5", name: "Restaurant", slug: "restaurant", icon: "🍴" },
  { id: "6", name: "Electrician", slug: "electrician", icon: "🔧" },
  { id: "7", name: "Pharmacy", slug: "pharmacy", icon: "💊" },
  { id: "8", name: "Bakery", slug: "bakery", icon: "🍰" },
];

const FALLBACK_BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Cut N Cute Studio",
    slug: "cut-n-cute-studio",
    description: "Unisex salon in Kodihalli — cuts, colour, spa & grooming.",
    address: "Kodihalli, Bengaluru",
    neighbourhood: "Kodihalli",
    latitude: 12.9611,
    longitude: 77.6484,
    phone: "+91 82170 09543",
    whatsapp: "+91 82170 09543",
    rating: 4.8,
    reviewCount: 210,
    isPremium: true,
    coverEmoji: "✂️",
    category: FALLBACK_CATEGORIES[1],
  },
  {
    id: "2",
    name: "Aya Flowers",
    slug: "aya-flowers",
    description: "Premium florist for bespoke bouquets and event florals.",
    address: "Whitefield, Bengaluru",
    neighbourhood: "Whitefield",
    latitude: 12.9698,
    longitude: 77.7499,
    phone: "+91 90000 00001",
    whatsapp: "",
    rating: 4.9,
    reviewCount: 88,
    isPremium: false,
    coverEmoji: "💐",
    category: FALLBACK_CATEGORIES[0],
  },
  {
    id: "3",
    name: "Fresh Mart",
    slug: "fresh-mart",
    description: "Daily-needs grocery store with fresh produce and essentials.",
    address: "Belathur, Bengaluru",
    neighbourhood: "Belathur",
    latitude: 12.9814,
    longitude: 77.757,
    phone: "+91 90000 00003",
    whatsapp: "",
    rating: 4.5,
    reviewCount: 132,
    isPremium: false,
    coverEmoji: "🛒",
    category: FALLBACK_CATEGORIES[3],
  },
];
