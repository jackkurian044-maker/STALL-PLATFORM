import Link from "next/link";
import type { Category } from "../../lib/api";

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl font-semibold text-navy">
        Popular categories
      </h2>
      <p className="mt-2 text-ink/60">
        Browse by what you need, right in your neighbourhood.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/explore?category=${cat.slug}`}
            className="group rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-4xl">{cat.icon}</div>
            <h3 className="mt-3 font-medium text-navy group-hover:text-gold">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
