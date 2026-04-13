import EmailSignupForm from "./EmailSignupForm";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Instagram */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us On Instagram!</h3>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-block text-white hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us!</h3>
            <p className="mb-1">
              <a
                href="tel:7048834758"
                className="underline hover:text-gray-300 transition-colors"
              >
                704-883-4758
              </a>
            </p>
            <p className="mb-6">
              <a
                href="mailto:julesorganicscc@gmail.com"
                className="underline hover:text-gray-300 transition-colors"
              >
                julesorganicscc@gmail.com
              </a>
            </p>
            <EmailSignupForm />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400">
          © {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
