"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
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
    <div className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/shop"
          className="section-label mb-10 inline-block hover:opacity-60 transition-opacity"
          style={{ color: "#7A7A72" }}
        >
          ← Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "1/1", backgroundColor: "#F2EDE6" }}
          >
            <div className="absolute inset-0 img-cream" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              style={{ opacity: 0 }}
              onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="section-label mb-4" style={{ color: "#3D6B47" }}>
              {product.category.replace("-", " ")}
            </p>
            <h1
              className="mb-4"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", color: "#1C1C1A", lineHeight: 1.15 }}
            >
              {product.name}
            </h1>

            <p
              className="text-xl mb-6"
              style={{ fontFamily: "Georgia, serif", color: "#1C1C1A" }}
            >
              ${product.price.toFixed(2)}
            </p>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#7A7A72", maxWidth: "420px" }}>
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className="btn-primary self-start mb-10"
              style={added ? { backgroundColor: "#1A2E1C" } : {}}
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #E8E4DC" }} className="pt-8">
              <p className="section-label mb-4">Ingredients</p>
              <ul className="space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm" style={{ color: "#7A7A72" }}>
                    <span style={{ color: "#3D6B47", marginTop: "2px" }}>—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand blurb */}
        <div
          className="mt-24 py-16 px-8 md:px-16 text-center"
          style={{ backgroundColor: "#F2EDE6" }}
        >
          <p className="section-label mb-4">the jules organics standard</p>
          <p
            className="mb-0"
            style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#1C1C1A", maxWidth: "580px", margin: "0 auto" }}
          >
            Every product is made in small batches from grass-fed beef tallow —
            no synthetics, no fillers, nothing your skin doesn&apos;t need.
          </p>
        </div>
      </div>
    </div>
  );
}
