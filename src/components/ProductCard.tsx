"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-400" : half && i === full ? "text-yellow-300" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden rounded-lg bg-gray-100 aspect-square relative mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder-product.jpg";
          }}
        />
      </Link>
      <div className="flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`} className="text-sm font-medium text-gray-900 hover:underline leading-snug">
          {product.name}
        </Link>
        {product.rating && product.reviewCount && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}
        <p className="text-sm text-gray-700 mt-1">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addItem(product)}
          className="btn-mauve mt-3 rounded-full py-2 px-4 text-xs font-semibold w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
