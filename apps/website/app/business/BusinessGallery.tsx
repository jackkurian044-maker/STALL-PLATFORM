type Props = {
  images: string[];
};

export default function BusinessGallery({ images }: Props) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Gallery</h2>

      {images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="rounded-lg"
            />
          ))}
        </div>
      )}
    </section>
  );
}
