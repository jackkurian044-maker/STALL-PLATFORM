import type { Business } from "../../../lib/api";

// Generic starter services per category until merchants can manage their
// own service/price list (planned for the merchant dashboard).
const GENERIC_SERVICES: Record<string, string[]> = {
  salon: ["Haircut", "Hair colour", "Spa treatment", "Grooming"],
  flowers: ["Bouquets", "Event florals", "Same-day delivery"],
  tailor: ["Alterations", "Custom stitching", "Formalwear"],
  grocery: ["Fresh produce", "Daily essentials", "Home delivery"],
  restaurant: ["Dine-in", "Takeaway", "Home delivery"],
  electrician: ["Home repairs", "Wiring", "Emergency call-out"],
  pharmacy: ["Prescription medicine", "Health essentials"],
  bakery: ["Custom cakes", "Fresh bread", "Pastries"],
};

export default function BusinessServices({ business }: { business: Business }) {
  const services = GENERIC_SERVICES[business.category?.slug ?? ""] ?? [];
  if (services.length === 0) return null;

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6">
      <h2 className="font-display text-xl font-semibold text-navy">
        Services
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink/70">
        {services.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
