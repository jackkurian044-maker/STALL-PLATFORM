import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { searchBusinesses } from "@/lib/business";
import type { Business } from "@/types/business";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() ?? "";
  const results: Business[] = query ? searchBusinesses(query) : [];

  return (
    <main className="container py-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Search Businesses</h1>

        <SearchBar initialQuery={query} />

        <div className="mt-8">
          <SearchResults query={query} results={results} />
        </div>
      </section>
    </main>
  );
}
