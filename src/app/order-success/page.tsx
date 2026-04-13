"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-5xl mb-6">🌿</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Thank you for your order!
      </h1>
      <p className="text-gray-600 mb-8">
        Your order has been placed successfully. You&apos;ll receive a confirmation
        email shortly. We appreciate your support of Jules Organics!
      </p>
      <Link
        href="/shop"
        className="btn-mauve inline-block rounded-full px-8 py-3 font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
