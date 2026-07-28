"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-yellow-400" />

          <span className="text-2xl font-bold tracking-wide text-yellow-400">
            STALL
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm md:flex">
          <Link
            href="/"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            href="/search"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            Explore
          </Link>

          <Link
            href="/vendors"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            Vendors
          </Link>

          <Link
            href="/about"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            About
          </Link>
        </nav>

        <button className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-black transition hover:bg-yellow-300">
          Register Shop
        </button>
      </div>
    </motion.header>
  );
}
