export default function BusinessHeader({
  name,
  rating,
  category,
  location,
}: {
  name: string;
  rating: string;
  category: string;
  location: string;
}) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Featured spot</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">{name}</h1>
          <p className="mt-2 text-stone-600">{category} • {location}</p>
        </div>
        <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span className="font-semibold">★ {rating}</span> · 128 reviews
        </div>
      </div>
    </section>
  );
}
