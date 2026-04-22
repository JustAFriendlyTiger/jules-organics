"use client";

import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function ShopGrid({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((all) => {
      setProducts(featuredOnly ? all.filter((p) => p.featured) : all);
      setLoading(false);
    });
  }, [featuredOnly]);

  if (loading) {
    return (
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        aria-busy="true"
      >
        {Array.from({ length: featuredOnly ? 4 : 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div
              className="aspect-square img-cream"
              style={{ opacity: 0.5 }}
            />
            <div style={{ height: "12px", background: "#DDD0E8", borderRadius: 2, width: "70%", opacity: 0.5 }} />
            <div style={{ height: "10px", background: "#DDD0E8", borderRadius: 2, width: "30%", opacity: 0.5 }} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
