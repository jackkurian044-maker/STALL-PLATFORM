type Props = {
  businessId: string;
};

const reviews = [
  {
    name: "Mina L.",
    text: "The atmosphere is calm, and the team made everything feel effortless.",
  },
  {
    name: "Jordan P.",
    text: "Every detail feels thoughtful and polished. I booked again immediately.",
  },
];

export default function BusinessReviews({ businessId }: Props) {
  return (
    <section
      data-business-id={businessId}
      className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-stone-900">Recent reviews</h2>
      <div className="mt-5 space-y-4">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-800">{review.name}</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
