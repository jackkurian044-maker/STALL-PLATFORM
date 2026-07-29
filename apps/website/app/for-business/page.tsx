export default function ForBusinessPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl font-semibold text-navy">
        List your business on STall
      </h1>
      <p className="mt-4 text-ink/70">
        Get discovered by customers searching in your neighbourhood. Free
        listing to start, with premium placement and offers available.
      </p>
      <form className="mt-8 space-y-4 rounded-2xl border border-navy/10 bg-white p-6">
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Business name
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-navy/15 px-4 py-2 outline-none focus:border-gold"
            placeholder="e.g. Cut N Cute Studio"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Category
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-navy/15 px-4 py-2 outline-none focus:border-gold"
            placeholder="e.g. Salon"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Neighbourhood
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-navy/15 px-4 py-2 outline-none focus:border-gold"
            placeholder="e.g. Kodihalli"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-gold hover:bg-ink"
        >
          Submit listing request
        </button>
        <p className="text-xs text-ink/40">
          This form is a placeholder — wire it to POST /businesses on the API
          once merchant auth is in place.
        </p>
      </form>
    </main>
  );
}
