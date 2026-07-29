import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl text-gold">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-2 text-ink/60">
        It may have moved, or the business you&apos;re looking for isn&apos;t
        listed yet.
      </p>
      <Link
        href="/explore"
        className="mt-6 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-gold hover:bg-ink"
      >
        Explore businesses
      </Link>
    </main>
  );
}
