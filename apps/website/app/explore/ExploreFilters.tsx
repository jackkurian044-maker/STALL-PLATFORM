"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "../../lib/api";

export default function ExploreFilters({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function selectCategory(slug?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/explore?${params.toString()}`);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        onClick={() => selectCategory(undefined)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          !activeCategory
            ? "bg-navy text-gold"
            : "bg-white text-ink/70 hover:bg-navy/5"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => selectCategory(cat.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeCategory === cat.slug
              ? "bg-navy text-gold"
              : "bg-white text-ink/70 hover:bg-navy/5"
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
