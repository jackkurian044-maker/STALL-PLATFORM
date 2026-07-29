export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-cream/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-gold">
              STall
            </p>
            <p className="mt-2 max-w-xs text-sm">
              That&apos;s All. Every neighbourhood business, one search away.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">For customers</p>
            <ul className="space-y-2">
              <li>Explore nearby</li>
              <li>Browse categories</li>
              <li>Leave a review</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">For businesses</p>
            <ul className="space-y-2">
              <li>Get listed free</li>
              <li>Claim your listing</li>
              <li>Go premium</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-cream/40">
          © {new Date().getFullYear()} STall. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
