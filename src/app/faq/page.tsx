export const metadata = { title: "FAQ — Jules Organics" };

const faqs = [
  {
    q: "What is tallow?",
    a: "Tallow is rendered fat from grass-fed, pasture-raised cattle. It has been used for centuries as a natural skin moisturizer and healer. Its lipid profile closely resembles that of human skin, making it highly biocompatible.",
  },
  {
    q: "Is tallow safe for sensitive skin?",
    a: "Yes! Tallow is one of the gentlest moisturizers available. It contains no synthetic ingredients, preservatives, or fragrances — just pure nourishing fat that your skin recognizes and absorbs easily.",
  },
  {
    q: "Where does your beef tallow come from?",
    a: "Our tallow comes from farm-raised, grass-fed cattle. We carefully source, render, and purify every batch to ensure the highest quality for your skin.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! We offer free domestic shipping on orders over $75 with code SHIPFREE75. Spend $100 and also receive a free mystery gift!",
  },
  {
    q: "What is your return policy?",
    a: "We want you to love your products. If you are unsatisfied for any reason, please reach out to us at julesorganicscc@gmail.com or call 704-883-4758 within 30 days of your order.",
  },
  {
    q: "Are your products vegan?",
    a: "Our products are made with animal-derived tallow and are not vegan. They are, however, free from synthetic chemicals and made with natural, whole ingredients.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-500 mb-10">
        Have a question not answered here? Contact us anytime.
      </p>

      <div className="space-y-6">
        {faqs.map(({ q, a }) => (
          <div key={q} className="border-b border-gray-200 pb-6">
            <h2 className="font-semibold text-gray-900 mb-2">{q}</h2>
            <p className="text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
