"use client";

type Props = {
  phone: string;
  whatsapp: string;
};

export default function BusinessActions({ phone, whatsapp }: Props) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">Book this place</h2>
      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            window.location.href = `https://wa.me/${whatsapp}`;
          }}
          className="rounded-2xl bg-stone-900 px-4 py-3 text-center font-semibold text-white"
        >
          Reserve a visit
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = `tel:${phone}`;
          }}
          className="rounded-2xl border border-stone-300 px-4 py-3 text-center font-semibold text-stone-700"
        >
          Call the studio
        </button>
      </div>
    </section>
  );
}
