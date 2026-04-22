import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Shop — Jules Organics",
  description: "Browse our full collection of organic tallow skincare.",
};

export default function ShopPage() {
  return (
    <div className="px-6 md:px-10 py-20" style={{ backgroundColor: "#FAF8FC", minHeight: "80vh" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 border-b pb-8" style={{ borderColor: "#DDD0E8" }}>
          <p className="section-label mb-3">the collection</p>
          <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.75rem,4vw,3rem)", color: "#1C1A20" }}>
            All Products
          </h1>
        </div>
        <ShopGrid />
      </div>
    </div>
  );
}
