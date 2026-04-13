import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[85vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Pure Organic Tallow"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
              Pure Organic Tallow
            </h1>
            <p className="text-base sm:text-lg mb-8 drop-shadow-md text-white/90">
              Our beef tallow comes from farm-raised animals and is carefully
              rendered and purified for everyday use. Using the wisdom of God&apos;s
              design for natural healing.
            </p>
            <Link
              href="/shop"
              className="btn-mauve inline-block rounded-full px-8 py-3 text-base font-semibold shadow-lg"
            >
              Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="btn-mauve inline-block rounded-full px-10 py-3 text-base font-semibold"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Mission blurb */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Why Tallow?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Beef tallow has been used for centuries as a skin healer. It closely
            mirrors the lipid structure of human skin, making it one of the most
            biocompatible moisturizers available. Free from synthetic chemicals,
            fragrances, and preservatives — just pure, nourishing fat from
            pasture-raised animals.
          </p>
        </div>
      </section>
    </>
  );
}
