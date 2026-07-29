"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?search=${encodeURIComponent(query)}` : "";
    router.push(`/explore${params}`);
  }

  return (
    <section className="relative overflow-hidden bg-navy px-6 py-24 text-cream">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(243,183,61,0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-block rounded-full border border-gold/30 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold">
          Hyperlocal, not another marketplace
        </p>
        <h1 className="font-display text-5xl font-semibold leading-tight md:text-6xl">
          Every business on your street,
          <br />
          <span className="text-gold">one search away</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-cream/70">
          Find trusted salons, flower shops, grocers, tailors, and every other
          neighbourhood business — with real reviews from people near you.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-2xl border border-gold/20 bg-white/5 p-3 backdrop-blur sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-navy px-4 py-3">
            <Search size={18} className="text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a salon, tailor, grocer..."
              className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/40"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-soft"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
