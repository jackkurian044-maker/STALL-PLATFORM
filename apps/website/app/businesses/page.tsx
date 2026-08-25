import { getBusinesses } from "@/lib/business";
import SearchResults from "@/components/search/SearchResults";
import type { Business } from "@/types/business";

export default function BusinessesPage() {
  const results: Business[] = getBusinesses();

  return (
    <main className="container py-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">All Businesses</h1>
        <p className="mb-6 text-sm text-slate-600">
          Browse every local business currently available in the platform.
        </p>

        <SearchResults query="All businesses" results={results} />
      </section>
    </main>
  );
}
