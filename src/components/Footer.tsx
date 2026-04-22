import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-auto px-6 md:px-10 py-16"
      style={{ borderTop: "1px solid #E8E4DC", backgroundColor: "#FAF8F4" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p
            className="text-lg tracking-widest mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Jules Organics
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#7A7A72" }}>
            Pure tallow skincare rooted in nature.
            <br />
            No fillers. No synthetics. Just what your skin needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="section-label mb-5">Quick Links</p>
          <ul className="space-y-3">
            {[
              { href: "/shop", label: "Shop" },
              { href: "/cart", label: "Cart" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm hover:opacity-60 transition-opacity"
                  style={{ color: "#1C1C1A" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="section-label mb-5">Contact</p>
          <ul className="space-y-2 text-sm" style={{ color: "#7A7A72" }}>
            <li>
              <a
                href="tel:7048834758"
                className="hover:opacity-60 transition-opacity"
                style={{ color: "#1C1C1A" }}
              >
                704-883-4758
              </a>
            </li>
            <li>
              <a
                href="mailto:julesorganicscc@gmail.com"
                className="hover:opacity-60 transition-opacity"
                style={{ color: "#1C1C1A" }}
              >
                julesorganicscc@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-12 pt-6 flex items-center justify-between text-xs"
        style={{ borderTop: "1px solid #E8E4DC", color: "#7A7A72" }}
      >
        <span>© {new Date().getFullYear()} Jules Organics. All rights reserved.</span>
        <div className="flex items-center gap-3">
          {/* Visa */}
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="24" rx="3" fill="#E8E4DC"/>
            <text x="50%" y="16" textAnchor="middle" fontSize="9" fill="#7A7A72" fontWeight="600">VISA</text>
          </svg>
          {/* MC */}
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="24" rx="3" fill="#E8E4DC"/>
            <circle cx="15" cy="12" r="7" fill="#C8B89A" opacity="0.8"/>
            <circle cx="23" cy="12" r="7" fill="#A89880" opacity="0.8"/>
          </svg>
          {/* AMEX */}
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="24" rx="3" fill="#E8E4DC"/>
            <text x="50%" y="16" textAnchor="middle" fontSize="7" fill="#7A7A72" fontWeight="600">AMEX</text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
