import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop — Jules Organics",
  description: "Browse our full collection of organic tallow skincare.",
};

export default function ShopPage() {
  return (
    <div className="px-6 md:px-10 py-20" style={{ backgroundColor: "#FAF8F4", minHeight: "80vh" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 border-b pb-8" style={{ borderColor: "#E8E4DC" }}>
          <p className="section-label mb-3">the collection</p>
          <h1
            style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#1C1C1A" }}
          >
            All Products
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
