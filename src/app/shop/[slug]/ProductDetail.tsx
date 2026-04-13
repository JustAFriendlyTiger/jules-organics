"use client";

import Image from "next/image";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          {product.rating && product.reviewCount && (
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.floor(product.rating!)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          )}

          <p className="text-2xl font-semibold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.details.length > 0 && (
            <ul className="mb-8 space-y-1">
              {product.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-brand-mauve mt-0.5">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleAddToCart}
            className="btn-mauve rounded-full py-4 px-8 text-base font-semibold w-full md:w-auto"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
