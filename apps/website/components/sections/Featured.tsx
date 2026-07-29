import Link from "next/link";
import type { Business } from "../../lib/api";
import BusinessCard from "../business/BusinessCard";

export default function Featured({ businesses }: { businesses: Business[] }) {
  const featured = businesses.filter((b) => b.isPremium).slice(0, 6);
  const list = featured.length > 0 ? featured : businesses.slice(0, 6);

  return (
    <section className="bg-navy/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-navy">
              Featured near you
            </h2>
            <p className="mt-2 text-ink/60">
              Highly-rated businesses your neighbours trust.
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden text-sm font-semibold text-navy hover:text-gold sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </section>
  );
}
