import { getBusinesses, getCategories } from "../../lib/api";
import BusinessCard from "../../components/business/BusinessCard";
import ExploreFilters from "./ExploreFilters";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinesses({ search: params.search, category: params.category }),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold text-navy">
        Explore businesses
      </h1>
      <p className="mt-2 text-ink/60">
        {businesses.length} result{businesses.length === 1 ? "" : "s"}
        {params.search ? ` for "${params.search}"` : ""}
        {params.category ? ` in ${params.category}` : ""}
      </p>

      <ExploreFilters categories={categories} activeCategory={params.category} />

      {businesses.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-navy/20 p-12 text-center text-ink/60">
          No businesses match yet. Try a different search or category — or{" "}
          <a href="/for-business" className="font-semibold text-navy underline">
            list your own business
          </a>
          .
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </main>
  );
}
