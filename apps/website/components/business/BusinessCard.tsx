import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import type { Business } from "../../lib/api";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      href={`/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-navy to-ink text-5xl">
        {business.coverEmoji}
        {business.isPremium && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy">
            Premium
          </span>
        )}
        {typeof business.distanceKm === "number" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy">
            <MapPin size={12} />
            {business.distanceKm < 1
              ? `${Math.round(business.distanceKm * 1000)} m`
              : `${business.distanceKm.toFixed(1)} km`}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-navy group-hover:text-gold">
            {business.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-navy">
            <Star size={14} className="fill-gold text-gold" />
            {business.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/60">{business.category?.name}</p>
        <p className="mt-2 line-clamp-2 text-sm text-ink/70">
          {business.description}
        </p>
        <p className="mt-3 text-xs text-ink/50">
          📍 {business.neighbourhood} · {business.reviewCount} reviews
        </p>
      </div>
    </Link>
  );
}
