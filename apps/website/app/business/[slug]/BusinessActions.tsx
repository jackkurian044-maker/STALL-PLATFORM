"use client";

import { Phone, MessageCircle, Heart } from "lucide-react";
import { useState } from "react";
import type { Business } from "../../../lib/api";

export default function BusinessActions({ business }: { business: Business }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-6">
      {business.phone && (
        <a
          href={`tel:${business.phone}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-gold hover:bg-ink"
        >
          <Phone size={16} /> Call {business.phone}
        </a>
      )}
      {business.whatsapp && (
        <a
          href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-navy/20 px-4 py-3 text-sm font-semibold text-navy hover:bg-navy/5"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      )}
      <button
        onClick={() => setSaved((s) => !s)}
        className="flex items-center justify-center gap-2 rounded-xl border border-navy/20 px-4 py-3 text-sm font-semibold text-navy hover:bg-navy/5"
      >
        <Heart size={16} className={saved ? "fill-gold text-gold" : ""} />
        {saved ? "Saved to favorites" : "Save to favorites"}
      </button>
    </div>
  );
}
