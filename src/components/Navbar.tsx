"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
      style={{ backgroundColor: "#FAF8F4", borderBottom: "1px solid #E8E4DC" }}
    >
      {/* Logo / Wordmark */}
      <Link
        href="/"
        className="text-lg md:text-xl font-normal tracking-widest"
        style={{ fontFamily: "Georgia, serif", color: "#1C1C1A" }}
      >
        Jules Organics
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-7">
        <Link
          href="/shop"
          className="section-label hover:opacity-60 transition-opacity"
          style={{ color: "#1C1C1A" }}
        >
          Shop
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          aria-label={`Cart (${totalItems} items)`}
          className="relative flex items-center hover:opacity-60 transition-opacity"
          style={{ color: "#1C1C1A" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center"
              style={{ backgroundColor: "#3D6B47" }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
