"use client";

import { useEffect, useState } from "react";
import { fetchSettings } from "@/lib/data";

export default function AnnouncementBar() {
  const [text, setText] = useState("Free shipping on orders over $75 · Use code SHIPFREE75");

  useEffect(() => {
    fetchSettings().then((s) => setText(s.announcement));
  }, []);

  return (
    <div className="announcement-bar text-center py-2.5 px-4">
      <p
        className="section-label"
        style={{ color: "#C8B8DC", letterSpacing: "0.15em" }}
      >
        {text}
      </p>
    </div>
  );
}
