import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full" style={{ height: "92vh", minHeight: "560px" }}>
        <div className="absolute inset-0 img-hero" />
        {/* Real hero image — add /public/hero.jpg to activate */}
        <Image
          src="/hero.jpg"
          alt="Jules Organics lifestyle"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0 }}
          onLoad={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "1";
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

        <div className="absolute inset-0 flex items-end pb-20 md:pb-28 px-6 md:px-16">
          <div style={{ maxWidth: "560px" }}>
            <p className="section-label mb-5" style={{ color: "rgba(250,248,244,0.7)" }}>
              organic tallow skincare
            </p>
            <h1
              className="mb-6 text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "Georgia, serif", fontWeight: 400, lineHeight: 1.05 }}
            >
              Pure.<br />Simple.<br />Yours.
            </h1>
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── STORY 1: WHY ORGANIC ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        {/* Image */}
        <div className="relative order-1" style={{ minHeight: "420px" }}>
          <div className="absolute inset-0 img-sage" />
          <Image
            src="/story-why-organic.jpg"
            alt="Why organic tallow"
            fill
            className="object-cover"
            style={{ opacity: 0 }}
            onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
          />
        </div>

        {/* Text */}
        <div
          className="order-2 flex flex-col justify-center px-8 md:px-16 py-20"
          style={{ backgroundColor: "#FAF8F4" }}
        >
          <p className="section-label mb-6">why organic?</p>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#1C1C1A" }}
          >
            Nature already knew
            <br />what your skin needed.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            For centuries, cultures across the world relied on animal fats as the
            foundation of skin healing. Beef tallow mirrors the lipid structure of
            human skin almost exactly — making it one of the most biocompatible
            moisturizers that exists.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            At Jules Organics, every batch starts with grass-fed beef tallow that
            is carefully rendered and purified — no synthetic fillers, no
            preservatives, nothing your body doesn&apos;t recognize.
          </p>
        </div>
      </section>

      {/* ── STORY 2: OUR PROMISE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        {/* Text */}
        <div
          className="order-2 md:order-1 flex flex-col justify-center px-8 md:px-16 py-20"
          style={{ backgroundColor: "#F2EDE6" }}
        >
          <p className="section-label mb-6">our promise</p>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#1C1C1A" }}
          >
            Every ingredient
            <br />earns its place.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            We believe the ingredient list should be short enough to read at a
            glance. No hidden chemicals, no filler oils, no marketing fluff. If it
            doesn&apos;t serve your skin, it doesn&apos;t make the cut.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            Our sourcing is transparent: grass-fed, pasture-raised animals, small
            batches rendered in-house, and botanicals chosen for their proven
            efficacy. That&apos;s the Jules Organics standard.
          </p>
        </div>

        {/* Image */}
        <div className="relative order-1 md:order-2" style={{ minHeight: "420px" }}>
          <div className="absolute inset-0 img-warm" />
          <Image
            src="/story-our-promise.jpg"
            alt="Our promise — ingredient transparency"
            fill
            className="object-cover"
            style={{ opacity: 0 }}
            onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
          />
        </div>
      </section>

      {/* ── STORY 3: OUR PRODUCTS ── */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>
        {/* Image */}
        <div className="relative order-1" style={{ minHeight: "420px" }}>
          <div className="absolute inset-0 img-moss" />
          <Image
            src="/story-our-products.jpg"
            alt="Jules Organics product line"
            fill
            className="object-cover"
            style={{ opacity: 0 }}
            onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
          />
        </div>

        {/* Text */}
        <div
          className="order-2 flex flex-col justify-center px-8 md:px-16 py-20"
          style={{ backgroundColor: "#FAF8F4" }}
        >
          <p className="section-label mb-6">our products</p>
          <h2
            className="mb-6"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#1C1C1A" }}
          >
            A small line,
            <br />made with intention.
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            From nourishing tallow lip balms to whipped eye creams and rich body
            crèmes — each product in our line is formulated to do one thing well:
            feed your skin the nutrients it&apos;s been missing.
          </p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "#7A7A72", maxWidth: "420px" }}>
            We keep the line small on purpose. Every product is tested, loved, and
            refined before it earns a place on the shelf.
          </p>
          <Link href="/shop" className="btn-outline self-start">
            See All Products
          </Link>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE BREAK ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "60vh", minHeight: "380px" }}>
        <div className="absolute inset-0 img-forest" />
        <Image
          src="/editorial-break.jpg"
          alt="Botanical nature editorial"
          fill
          className="object-cover"
          style={{ opacity: 0 }}
          onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="section-label mb-4" style={{ color: "rgba(250,248,244,0.6)" }}>
              shaped by nature
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.75rem, 4vw, 3.5rem)", maxWidth: "600px" }}
            >
              Rooted in tradition.<br />Made for today.
            </h2>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="px-6 md:px-10 py-24" style={{ backgroundColor: "#FAF8F4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">the collection</p>
              <h2
                style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#1C1C1A" }}
              >
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:block text-sm hover:opacity-60 transition-opacity"
              style={{ color: "#7A7A72", textDecoration: "underline", textUnderlineOffset: "4px" }}
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Link href="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY CALLOUT ── */}
      <section
        className="px-6 md:px-10 py-24 text-center"
        style={{ backgroundColor: "#F2EDE6" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="section-label mb-6">our mission</p>
          <h2
            className="mb-6"
            style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#1C1C1A" }}
          >
            Skincare the way nature intended.
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "#7A7A72" }}>
            We believe healthy skin shouldn&apos;t require a chemistry degree to
            understand. Jules Organics was founded on the conviction that the best
            ingredients are the ones your body already knows — simple, whole, and
            sourced with care.
          </p>
          <Link href="/shop" className="btn-primary">
            Start Your Ritual
          </Link>
        </div>
      </section>
    </>
  );
}
