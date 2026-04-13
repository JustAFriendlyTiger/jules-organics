export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  image: string;
  category: "lip-balm" | "tallow" | "eye-cream" | "body";
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  stripePriceId?: string; // fill in after Stripe setup
}

export const products: Product[] = [
  {
    id: "1",
    slug: "coconut-coffee-tallow-lip-balm",
    name: "Coconut & Coffee Tallow Lip Balm",
    price: 6.99,
    description:
      "A rich, nourishing lip balm made with organic beef tallow, coconut oil, and coffee. Deeply moisturizing and naturally healing.",
    details: [
      "Organic grass-fed beef tallow",
      "Coconut oil",
      "Coffee extract",
      "No synthetic ingredients",
    ],
    image: "/products/coconut-coffee-lip-balm.jpg",
    category: "lip-balm",
    featured: true,
  },
  {
    id: "2",
    slug: "cocoa-tallow-lip-balm",
    name: "Cocoa Tallow Lip Balm",
    price: 6.99,
    description:
      "Smooth and indulgent lip balm infused with cocoa and organic tallow for soft, supple lips all day long.",
    details: [
      "Organic grass-fed beef tallow",
      "Cocoa butter",
      "Natural cocoa flavor",
      "No synthetic ingredients",
    ],
    image: "/products/cocoa-lip-balm.jpg",
    category: "lip-balm",
    featured: true,
  },
  {
    id: "3",
    slug: "berries-cream-tallow-lip-balm",
    name: "Berries & Cream Tallow Lip Balm",
    price: 6.99,
    description:
      "A sweet and fruity lip balm combining the healing power of tallow with the antioxidant richness of berries.",
    details: [
      "Organic grass-fed beef tallow",
      "Berry extract",
      "Cream base",
      "No synthetic ingredients",
    ],
    image: "/products/berries-cream-lip-balm.jpg",
    category: "lip-balm",
    featured: true,
  },
  {
    id: "4",
    slug: "whipped-matcha-green-tea-eye-cream",
    name: "Whipped Matcha & Green Tea Eye Cream",
    price: 19.99,
    description:
      "A luxurious whipped eye cream packed with antioxidants from matcha and green tea to reduce puffiness and nourish delicate skin.",
    details: [
      "Organic grass-fed beef tallow",
      "Matcha powder",
      "Green tea extract",
      "Whipped texture for easy application",
    ],
    image: "/products/matcha-eye-cream.jpg",
    category: "eye-cream",
    rating: 4.5,
    reviewCount: 1,
    featured: true,
  },
  {
    id: "5",
    slug: "passion-fruit-beef-tallow-1oz",
    name: "Passion Fruit Infused Beef Tallow 1 oz",
    price: 12.99,
    description:
      "Pure beef tallow infused with passion fruit for a tropical twist on traditional skin healing. Great for face and body.",
    details: [
      "100% grass-fed beef tallow",
      "Passion fruit oil",
      "1 oz jar",
      "Face & body safe",
    ],
    image: "/products/passion-fruit-tallow.jpg",
    category: "tallow",
    featured: true,
  },
  {
    id: "6",
    slug: "christmas-spice-body-creme",
    name: "Christmas Spice Body Crème",
    price: 65.0,
    description:
      "A festive, deeply nourishing body crème blended with warming holiday spices. A luxurious treat for dry or sensitive skin.",
    details: [
      "Organic grass-fed beef tallow",
      "Cinnamon & clove essential oils",
      "Warming spice blend",
      "Rich crème texture",
    ],
    image: "/products/christmas-spice-body-creme.jpg",
    category: "body",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
