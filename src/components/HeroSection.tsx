"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchSettings, type SiteSettings } from "@/lib/data";

const DEFAULTS: Pick<SiteSettings, "heroLabel" | "heroHeadline" | "heroButton"> = {
  heroLabel: "organic tallow skincare",
  heroHeadline: "Pure.\nSimple.\nYours.",
  heroButton: "Shop Now",
};

export default function HeroSection() {
  const [s, setS] = useState(DEFAULTS);

  useEffect(() => {
    fetchSettings().then((data) =>
      setS({ heroLabel: data.heroLabel, heroHeadline: data.heroHeadline, heroButton: data.heroButton })
    );
  }, []);

  const lines = s.heroHeadline.split("\n");

  return (
    <section className="relative w-full img-hero" style={{ height: "92vh", minHeight: "560px" }}>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.1) 60%,transparent 100%)" }}
      />
      <div className="absolute inset-0 flex items-end pb-20 md:pb-28 px-6 md:px-16">
        <div style={{ maxWidth: "560px" }}>
          <p className="section-label mb-5" style={{ color: "rgba(250,248,252,0.7)" }}>
            {s.heroLabel}
          </p>
          <h1
            className="mb-6 text-white"
            style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontFamily: "Georgia,serif", fontWeight: 400, lineHeight: 1.05 }}
          >
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <Link href="/shop" className="btn-primary">
            {s.heroButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
