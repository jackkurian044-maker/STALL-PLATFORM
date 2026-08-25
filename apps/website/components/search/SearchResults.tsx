import Link from "next/link";
import type { Business } from "@/types/business";

interface SearchResultsProps {
  query: string;
  results: Business[];
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  if (!query) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          Enter a search term in the address bar as <code>?q=coffee</code> to see results.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-slate-700">
          No businesses found for <strong>{query}</strong>. Try a different search term.
        </p>
        <Link href="/" className="mt-4 inline-block text-green-700 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((business) => (
        <article key={business.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 text-sm text-slate-500">{business.category}</div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">{business.name}</h2>
          <p className="text-sm text-slate-600 mb-4">{business.city}, {business.state}</p>
          <div className="mb-4 flex items-center gap-2 text-sm text-amber-700">
            <span>⭐</span>
            <span>{business.rating.toFixed(1)} ({business.reviewCount} reviews)</span>
          </div>
          <Link href={`/business/${business.id}`} className="inline-flex items-center justify-center rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">
            View details
          </Link>
        </article>
      ))}
    </div>
  );
}
