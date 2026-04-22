"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
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
        style={{ backgroundColor: "#F0EAF6" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 img-cream -z-10" />
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm leading-snug hover:opacity-60 transition-opacity mb-1"
          style={{ fontFamily: "Georgia, serif", color: "#1C1A20" }}
        >
          {product.name}
        </Link>
        <p className="text-sm mb-3" style={{ color: "#8A7A8E" }}>
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAdd}
          className="btn-outline text-xs py-2 px-4 w-full mt-auto"
          style={
            added
              ? { backgroundColor: "#8B6A8A", color: "#FAF8FC", borderColor: "#8B6A8A" }
              : {}
          }
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
