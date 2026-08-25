import { getBusinesses } from "@/lib/business";

export default function MerchantDashboardPage() {
  const businesses = getBusinesses();
  const businessCount = businesses.length;
  const totalViews = businesses.reduce((sum, business) => sum + (business.views ?? 0), 0);
  const totalReviews = businesses.reduce((sum, business) => sum + business.reviewCount, 0);
  const averageRating = businessCount
    ? businesses.reduce((sum, business) => sum + business.rating, 0) / businessCount
    : 0;

  return (
    <main className="container py-8">
      <section style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Merchant Dashboard</h1>
          <p className="mt-3 text-slate-600">
            Manage your businesses, track performance, and update listings from one dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4 mb-10">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">My Businesses</p>
            <p className="mt-4 text-3xl font-semibold">{businessCount}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Views</p>
            <p className="mt-4 text-3xl font-semibold">{totalViews.toLocaleString()}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Reviews</p>
            <p className="mt-4 text-3xl font-semibold">{totalReviews}</p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Rating</p>
            <p className="mt-4 text-3xl font-semibold">{averageRating.toFixed(1)}</p>
          </article>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">My Businesses</h2>
              <p className="text-sm text-slate-500">Review and edit your active listings below.</p>
            </div>
            <a
              href="/merchant/business/new"
              className="inline-flex rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
            >
              Add new business
            </a>
          </div>

          <div className="space-y-4">
            {businesses.map((business) => (
              <article key={business.id} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{business.name}</p>
                    <h3 className="text-xl font-semibold">{business.category} in {business.city}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {business.rating.toFixed(1)} ★
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {business.reviewCount} reviews
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {business.views?.toLocaleString() ?? 0} views
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`/merchant/business/edit/${business.id}`}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit Business
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
