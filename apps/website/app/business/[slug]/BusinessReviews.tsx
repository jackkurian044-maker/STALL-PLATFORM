"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Review = {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  reply?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function BusinessReviews({
  businessId,
  initialReviews,
}: {
  businessId: string;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (comment.trim().length < 3) {
      setError("Please write a few words about your experience.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        `${API_URL}/businesses/${businessId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating,
            comment,
            authorName: name || "Anonymous",
          }),
        },
      );
      if (!res.ok) throw new Error("Request failed");
      const review = await res.json();
      setReviews((prev) => [review, ...prev]);
      setComment("");
      setName("");
      setRating(5);
    } catch {
      setError("Couldn't submit your review — the API may not be running.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6">
      <h2 className="font-display text-xl font-semibold text-navy">
        Reviews
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} stars`}
            >
              <Star
                size={20}
                className={n <= rating ? "fill-gold text-gold" : "text-navy/20"}
              />
            </button>
          ))}
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-xl border border-navy/15 px-4 py-2 text-sm outline-none focus:border-gold"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="w-full rounded-xl border border-navy/15 px-4 py-2 text-sm outline-none focus:border-gold"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-gold disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Post review"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reviews.length === 0 && (
          <p className="text-sm text-ink/50">No reviews yet — be the first.</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-navy/5 pb-4 last:border-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </span>
              <span className="text-sm font-medium text-navy">
                {r.authorName}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/70">{r.comment}</p>
            {r.reply && (
              <p className="mt-2 rounded-lg bg-navy/5 p-3 text-xs text-ink/60">
                <span className="font-semibold text-navy">Owner reply: </span>
                {r.reply}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
