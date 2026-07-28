"use client";

import { motion } from "framer-motion";
import { Search, Store, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold leading-tight md:text-7xl"
        >
          Discover Local
          <br />
          <span className="text-yellow-400">Businesses Near You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 md:text-xl"
        >
          Find flower shops, tailors, grocery stores, salons, home services,
          restaurants, and hundreds of local businesses around your location.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-4 rounded-2xl border border-yellow-500/20 bg-white/5 p-4 backdrop-blur-lg md:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-black px-4 py-3">
            <Search className="text-yellow-400" size={20} />
            <input
              type="text"
              placeholder="Search for a business..."
              className="w-full bg-transparent outline-none placeholder:text-gray-500"
            />
          </div>

          <button className="rounded-xl bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300">
            Search
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 backdrop-blur">
            <Store className="mx-auto mb-4 text-yellow-400" size={34} />
            <h3 className="text-xl font-semibold">Thousands of Vendors</h3>
            <p className="mt-3 text-gray-400">
              Explore verified local businesses in your neighborhood.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 backdrop-blur">
            <MapPin className="mx-auto mb-4 text-yellow-400" size={34} />
            <h3 className="text-xl font-semibold">Nearby Discovery</h3>
            <p className="mt-3 text-gray-400">
              Find services closest to your current location.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-6 backdrop-blur">
            <Search className="mx-auto mb-4 text-yellow-400" size={34} />
            <h3 className="text-xl font-semibold">Smart Search</h3>
            <p className="mt-3 text-gray-400">
              Search by category, business name, or service instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
