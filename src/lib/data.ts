export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  category: "lip-balm" | "tallow" | "eye-cream" | "body";
  featured?: boolean;
  stripePriceId?: string;
}

export interface SiteSettings {
  announcement: string;
  heroLabel: string;
  heroHeadline: string;
  heroButton: string;
  missionHeadline: string;
  missionBody: string;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE}/data/products.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("fetch failed");
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchSettings(): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    announcement: "Free shipping on orders over $75 · Use code SHIPFREE75",
    heroLabel: "organic tallow skincare",
    heroHeadline: "Pure.\nSimple.\nYours.",
    heroButton: "Shop Now",
    missionHeadline: "Skincare the way nature intended.",
    missionBody:
      "We believe healthy skin shouldn’t require a chemistry degree to understand. Jules Organics was founded on the conviction that the best ingredients are the ones your body already knows — simple, whole, and sourced with care.",
  };
  try {
    const res = await fetch(`${BASE}/data/settings.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("fetch failed");
    return { ...defaults, ...(await res.json()) };
  } catch {
    return defaults;
  }
}
