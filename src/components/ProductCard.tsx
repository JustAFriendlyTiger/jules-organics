"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="group flex flex-col">
      <Link
        href={`/shop/${product.slug}`}
        className="block overflow-hidden aspect-square relative mb-4"
        style={{ backgroundColor: "#F2EDE6" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback botanical tint visible when image is absent */}
        <div className="absolute inset-0 img-cream -z-10" />
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm leading-snug hover:opacity-60 transition-opacity mb-1"
          style={{ fontFamily: "Georgia, serif", color: "#1C1C1A" }}
        >
          {product.name}
        </Link>
        <p className="text-sm mb-3" style={{ color: "#7A7A72" }}>
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAdd}
          className="btn-outline text-xs py-2 px-4 w-full mt-auto"
          style={added ? { backgroundColor: "#3D6B47", color: "#FAF8F4", borderColor: "#3D6B47" } : {}}
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
