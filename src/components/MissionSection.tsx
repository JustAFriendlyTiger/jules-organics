"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchSettings, type SiteSettings } from "@/lib/data";

type MissionFields = Pick<SiteSettings, "missionHeadline" | "missionBody">;

const DEFAULTS: MissionFields = {
  missionHeadline: "Skincare the way nature intended.",
  missionBody:
    "We believe healthy skin shouldn't require a chemistry degree to understand. Jules Organics was founded on the conviction that the best ingredients are the ones your body already knows — simple, whole, and sourced with care.",
};

export default function MissionSection() {
  const [s, setS] = useState(DEFAULTS);

  useEffect(() => {
    fetchSettings().then((data) =>
      setS({ missionHeadline: data.missionHeadline, missionBody: data.missionBody })
    );
  }, []);

  return (
    <section className="px-6 md:px-10 py-24 text-center" style={{ backgroundColor: "#F0EAF6" }}>
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-6">our mission</p>
        <h2
          className="mb-6"
          style={{ fontFamily: "Georgia,serif", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "#1C1A20" }}
        >
          {s.missionHeadline}
        </h2>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "#8A7A8E" }}>
          {s.missionBody}
        </p>
        <Link href="/shop" className="btn-primary">Start Your Ritual</Link>
      </div>
    </section>
  );
}
