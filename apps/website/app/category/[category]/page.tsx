import { getBusinessesByCategory } from "@/lib/business";
import SearchResults from "@/components/search/SearchResults";
import type { Business } from "@/types/business";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category;
  const results: Business[] = getBusinessesByCategory(category);

  if (results.length === 0) {
    return (
      <main className="container py-8">
        <h1 className="text-3xl font-bold">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>

        <p className="mt-4">
          No businesses found in this category.
        </p>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Businesses that match the <strong>{category}</strong> category.
        </p>

        <SearchResults query={category} results={results} />
      </section>
    </main>
  );
}
