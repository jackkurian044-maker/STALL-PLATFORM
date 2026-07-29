import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-navy">
          STall
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <Link href="/explore" className="hover:text-navy">
            Explore
          </Link>
          <Link href="/explore?category=salon" className="hover:text-navy">
            Categories
          </Link>
          <Link
            href="/for-business"
            className="flex items-center gap-1.5 hover:text-navy"
          >
            <MapPin size={14} />
            List your business
          </Link>
        </nav>

        <Link
          href="/for-business"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-ink"
        >
          Get listed
        </Link>
      </div>
    </header>
  );
}
