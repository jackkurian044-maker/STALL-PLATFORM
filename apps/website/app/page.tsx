import Link from "next/link";
import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import Featured from "../components/sections/Featured";
import { getBusinesses, getCategories } from "../lib/api";

export default async function Home() {
  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinesses(),
  ]);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            What STall is
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
            A neighbourhood-first technology platform for local businesses.
          </h2>
          <p className="mt-5 text-base leading-7 text-ink/70">
            STall brings local discovery, business profiles, categories and
            customer reviews into one simple experience. Customers can find
            businesses around them, while local businesses get a digital
            presence where nearby customers are already looking.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <p className="text-2xl">01</p>
            <h3 className="mt-4 font-semibold text-navy">Discover locally</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Search businesses by name or category and explore what is
              available in your neighbourhood.
            </p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <p className="text-2xl">02</p>
            <h3 className="mt-4 font-semibold text-navy">Evaluate with context</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Business profiles and customer reviews help people understand a
              local business before they visit.
            </p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <p className="text-2xl">03</p>
            <h3 className="mt-4 font-semibold text-navy">Help businesses get found</h3>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              Local businesses can establish a presence on STall and reach
              customers searching in their area.
            </p>
          </div>
        </div>
      </section>

      <Categories categories={categories} />

      <Featured businesses={businesses} />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-navy px-8 py-12 text-center text-cream md:px-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            For local businesses
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
            Give your business a digital presence where nearby customers can
            find you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-cream/70">
            Start with a free listing and learn how STall can help your
            neighbourhood business become easier to discover.
          </p>
          <Link
            href="/for-business"
            className="mt-7 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold-soft"
          >
            List your business
          </Link>
        </div>
      </section>
    </main>
  );
}
