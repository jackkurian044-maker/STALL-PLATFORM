import type { Business } from "../../../lib/api";

export default function BusinessInfo({ business }: { business: Business }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6">
      <h2 className="font-display text-xl font-semibold text-navy">About</h2>
      <p className="mt-2 text-sm text-ink/70">{business.description}</p>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b border-navy/5 pb-2">
          <dt className="text-ink/50">Address</dt>
          <dd className="text-right text-ink/80">{business.address}</dd>
        </div>
        <div className="flex justify-between border-b border-navy/5 pb-2">
          <dt className="text-ink/50">Phone</dt>
          <dd className="text-ink/80">{business.phone || "Not listed"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/50">Category</dt>
          <dd className="text-ink/80">{business.category?.name}</dd>
        </div>
      </dl>
    </div>
  );
}
