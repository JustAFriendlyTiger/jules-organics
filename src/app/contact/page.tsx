import ContactForm from "./ContactForm";

export const metadata = { title: "Contact — Jules Organics" };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        We&apos;d love to hear from you. Reach out any time.
      </p>

      <div className="mb-10 space-y-2 text-gray-700">
        <p>
          <span className="font-medium">Phone: </span>
          <a href="tel:7048834758" className="text-brand-mauve hover:underline">
            704-883-4758
          </a>
        </p>
        <p>
          <span className="font-medium">Email: </span>
          <a
            href="mailto:julesorganicscc@gmail.com"
            className="text-brand-mauve hover:underline"
          >
            julesorganicscc@gmail.com
          </a>
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
