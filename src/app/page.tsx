import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";

export default function HomePage() {
  return (
    <>
      {/* ── HERO (settings loaded client-side) ── */}
      <HeroSection />

      {/* ── STORY 1: WHY ORGANIC ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        <div className="relative order-1 img-sage" style={{ minHeight: "420px" }} />
        <div className="order-2 flex flex-col justify-center px-8 md:px-16 py-20" style={{ backgroundColor: "#FAF8FC" }}>
          <p className="section-label mb-6">why organic?</p>
          <h2 className="mb-6" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)", fontFamily: "Georgia,serif", fontWeight: 400, color: "#1C1A20" }}>
            Nature already knew<br />what your skin needed.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            For centuries, cultures across the world relied on animal fats as the foundation of skin healing.
            Beef tallow mirrors the lipid structure of human skin almost exactly — making it one of the most
            biocompatible moisturizers that exists.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            At Jules Organics, every batch starts with grass-fed beef tallow carefully rendered and purified —
            no synthetic fillers, no preservatives, nothing your body doesn&apos;t recognize.
          </p>
        </div>
      </section>

      {/* ── STORY 2: OUR PROMISE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        <div className="order-2 md:order-1 flex flex-col justify-center px-8 md:px-16 py-20" style={{ backgroundColor: "#F0EAF6" }}>
          <p className="section-label mb-6">our promise</p>
          <h2 className="mb-6" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)", fontFamily: "Georgia,serif", fontWeight: 400, color: "#1C1A20" }}>
            Every ingredient<br />earns its place.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            We believe the ingredient list should be short enough to read at a glance. No hidden chemicals,
            no filler oils, no marketing fluff. If it doesn&apos;t serve your skin, it doesn&apos;t make the cut.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            Our sourcing is transparent: grass-fed, pasture-raised animals, small batches rendered in-house,
            and botanicals chosen for their proven efficacy.
          </p>
        </div>
        <div className="relative order-1 md:order-2 img-warm" style={{ minHeight: "420px" }} />
      </section>

      {/* ── STORY 3: OUR PRODUCTS ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        <div className="relative order-1 img-moss" style={{ minHeight: "420px" }} />
        <div className="order-2 flex flex-col justify-center px-8 md:px-16 py-20" style={{ backgroundColor: "#FAF8FC" }}>
          <p className="section-label mb-6">our products</p>
          <h2 className="mb-6" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)", fontFamily: "Georgia,serif", fontWeight: 400, color: "#1C1A20" }}>
            A small line,<br />made with intention.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            From nourishing tallow lip balms to whipped eye creams and rich body crèmes — each product is
            formulated to do one thing well: feed your skin the nutrients it&apos;s been missing.
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#8A7A8E", maxWidth: "420px" }}>
            We keep the line small on purpose. Every product is tested, loved, and refined before it earns
            a place on the shelf.
          </p>
          <Link href="/shop" className="btn-outline self-start">See All Products</Link>
        </div>
      </section>

      {/* ── FULL-WIDTH BREAK ── */}
      <section className="relative w-full img-forest flex items-center justify-center text-center" style={{ height: "60vh", minHeight: "380px" }}>
        <div>
          <p className="section-label mb-4" style={{ color: "rgba(250,248,252,0.6)" }}>shaped by nature</p>
          <h2 className="text-white" style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.75rem,4vw,3.5rem)", maxWidth: "600px" }}>
            Rooted in tradition.<br />Made for today.
          </h2>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="px-6 md:px-10 py-24" style={{ backgroundColor: "#FAF8FC" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">the collection</p>
              <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "#1C1A20" }}>
                Featured Products
              </h2>
            </div>
            <Link href="/shop" className="hidden md:block text-sm hover:opacity-60 transition-opacity" style={{ color: "#8A7A8E", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              View all
            </Link>
          </div>
          <ShopGrid featuredOnly />
          <div className="mt-10 flex justify-center md:hidden">
            <Link href="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── MISSION (settings loaded client-side) ── */}
      <MissionSection />
    </>
  );
}
