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
      <div
        className="flex flex-col items-center justify-center text-center px-6 py-32"
        style={{ backgroundColor: "#FAF8F4", minHeight: "70vh" }}
      >
        <p className="section-label mb-4">your cart</p>
        <h1
          className="mb-4"
          style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "1.75rem", color: "#1C1C1A" }}
        >
          Your cart is empty.
        </h1>
        <p className="text-sm mb-10" style={{ color: "#7A7A72" }}>
          You haven&apos;t added anything yet.
        </p>
        <Link href="/shop" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: "#FAF8F4", minHeight: "70vh" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 border-b pb-6" style={{ borderColor: "#E8E4DC" }}>
          <p className="section-label mb-2">your cart</p>
          <h1
            style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "2rem", color: "#1C1C1A" }}
          >
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-5 pb-6"
                style={{ borderBottom: "1px solid #E8E4DC" }}
              >
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ width: "88px", height: "88px", backgroundColor: "#F2EDE6" }}
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

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4 mb-1">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="text-sm leading-snug hover:opacity-60 transition-opacity"
                      style={{ fontFamily: "Georgia, serif", color: "#1C1C1A" }}
                    >
                      {product.name}
                    </Link>
                    <span className="text-sm shrink-0" style={{ color: "#1C1C1A" }}>
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "#7A7A72" }}>
                    ${product.price.toFixed(2)} each
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border" style={{ borderColor: "#E8E4DC" }}>
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg leading-none hover:opacity-50 transition-opacity"
                        style={{ color: "#1C1C1A" }}
                      >
                        −
                      </button>
                      <span className="px-3 text-sm" style={{ color: "#1C1C1A" }}>{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-lg leading-none hover:opacity-50 transition-opacity"
                        style={{ color: "#1C1C1A" }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-xs hover:opacity-50 transition-opacity"
                      style={{ color: "#7A7A72", textDecoration: "underline", textUnderlineOffset: "3px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="p-8 sticky top-24"
              style={{ backgroundColor: "#F2EDE6" }}
            >
              <p className="section-label mb-6">order summary</p>
              <div className="space-y-3 text-sm mb-6" style={{ color: "#7A7A72" }}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span style={{ color: "#1C1C1A" }}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span style={{ color: "#1C1C1A" }}>
                    {totalPrice >= 75 ? "Free" : "Calculated at checkout"}
                  </span>
                </div>
              </div>
              <div
                className="flex justify-between text-sm font-medium pt-4 mb-8"
                style={{ borderTop: "1px solid #E8E4DC", color: "#1C1C1A" }}
              >
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? "Redirecting…" : "Checkout"}
              </button>
              <Link
                href="/shop"
                className="block text-center text-xs mt-4 hover:opacity-60 transition-opacity"
                style={{ color: "#7A7A72", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
