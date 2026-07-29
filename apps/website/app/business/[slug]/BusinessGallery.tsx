import type { Business } from "../../../lib/api";

// Placeholder gallery until photo uploads are wired to real storage.
// Renders business.images if present, otherwise a friendly empty state.
export default function BusinessGallery({ business }: { business: Business }) {
  const images = (business as { images?: { id: string; url: string; alt: string }[] })
    .images;

  if (!images || images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-navy/20 bg-white p-8 text-center text-sm text-ink/50">
        No photos yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.id}
          src={img.url}
          alt={img.alt || business.name}
          className="h-32 w-full rounded-xl object-cover"
        />
      ))}
    </div>
  );
}
