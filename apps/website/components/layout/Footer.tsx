import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-cream/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-gold">STall</p>
            <p className="mt-2 max-w-xs text-sm">
              That&apos;s All. A neighbourhood-first platform for discovering
              local businesses.
            </p>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">Customers</p>
            <ul className="space-y-2">
              <li><Link href="/explore" className="hover:text-gold">Explore nearby</Link></li>
              <li><Link href="/explore" className="hover:text-gold">Browse categories</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">Businesses</p>
            <ul className="space-y-2">
              <li><Link href="/for-business" className="hover:text-gold">Get listed</Link></li>
              <li><Link href="/for-business" className="hover:text-gold">Claim your listing</Link></li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">STall</p>
            <p className="leading-6">
              Questions or partnership enquiries?
            </p>
            <a
              href="mailto:admin@stallwale.in"
              className="mt-2 inline-block text-gold hover:text-gold-soft"
            >
              admin@stallwale.in
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-5 text-xs text-cream/40">
          © {new Date().getFullYear()} STall. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
