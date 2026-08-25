export default function BusinessInfo({
  description,
  address,
  hours,
}: {
  description: string;
  address: string;
  hours: string;
}) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">About this business</h2>
      <p className="mt-4 leading-7 text-stone-600">{description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-stone-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Address</p>
          <p className="mt-2 text-stone-700">{address}</p>
        </div>
        <div className="rounded-2xl bg-stone-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Hours</p>
          <p className="mt-2 text-stone-700">{hours}</p>
        </div>
      </div>
    </section>
  );
}
