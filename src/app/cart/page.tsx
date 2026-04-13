"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { url } = await res.json();
      if (url) router.push(url);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (totalItems === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-mauve inline-block rounded-full px-8 py-3 font-semibold">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 border border-gray-200 rounded-xl p-4">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder-product.jpg";
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <Link href={`/shop/${product.slug}`} className="font-medium text-gray-900 hover:underline text-sm">
                    {product.name}
                  </Link>
                  <span className="font-semibold text-sm">${(product.price * quantity).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">${product.price.toFixed(2)} each</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQty(product.id, quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQty(product.id, quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border border-gray-200 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{totalPrice >= 75 ? "Free" : "Calculated at checkout"}</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="btn-mauve rounded-full py-3 px-6 font-semibold w-full disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Checkout"}
          </button>
          <Link href="/shop" className="block text-center text-sm text-gray-500 mt-4 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
