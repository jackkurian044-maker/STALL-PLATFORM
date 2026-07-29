import { Star, MapPin } from "lucide-react";
import type { Business } from "../../../lib/api";

export default function BusinessHeader({ business }: { business: Business }) {
  return (
    <div className="relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-ink p-8 text-cream">
      <div className="absolute right-6 top-6 text-8xl opacity-20">
        {business.coverEmoji}
      </div>
      {business.isPremium && (
        <span className="absolute left-6 top-6 w-fit rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy">
          Premium listing
        </span>
      )}
      <p className="text-sm uppercase tracking-widest text-gold">
        {business.category?.name}
      </p>
      <h1 className="font-display text-4xl font-semibold">{business.name}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-cream/80">
        <span className="flex items-center gap-1">
          <Star size={14} className="fill-gold text-gold" />
          {business.rating.toFixed(1)} ({business.reviewCount} reviews)
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {business.neighbourhood}
        </span>
      </div>
    </div>
  );
}
