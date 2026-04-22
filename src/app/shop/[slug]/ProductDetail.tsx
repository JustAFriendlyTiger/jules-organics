"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: "#FAF8FC" }}>
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="section-label mb-10 inline-block hover:opacity-60 transition-opacity" style={{ color: "#8A7A8E" }}>
          ← Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative overflow-hidden img-cream" style={{ aspectRatio: "1/1" }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="section-label mb-4" style={{ color: "#8B6A8A" }}>
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mb-4" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "#1C1A20", lineHeight: 1.15 }}>
              {product.name}
            </h1>
            <p className="text-xl mb-6" style={{ fontFamily: "Georgia,serif", color: "#1C1A20" }}>
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className="btn-primary self-start mb-10"
              style={added ? { backgroundColor: "#5D3F6A" } : {}}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            <div style={{ borderTop: "1px solid #DDD0E8" }} className="pt-8">
              <p className="section-label mb-4">Ingredients</p>
              <ul className="space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm" style={{ color: "#8A7A8E" }}>
                    <span style={{ color: "#8B6A8A", marginTop: "2px" }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand blurb */}
        <div className="mt-24 py-16 px-8 md:px-16 text-center" style={{ backgroundColor: "#F0EAF6" }}>
          <p className="section-label mb-4">the jules organics standard</p>
          <p style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "#1C1A20", maxWidth: "580px", margin: "0 auto" }}>
            Every product is made in small batches from grass-fed beef tallow —
            no synthetics, no fillers, nothing your skin doesn&apos;t need.
          </p>
        </div>
      </div>
    </div>
  );
}
