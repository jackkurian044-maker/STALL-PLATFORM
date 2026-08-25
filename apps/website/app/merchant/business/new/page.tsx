"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MerchantBusinessNewPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [openingHours, setOpeningHours] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!coverImage) {
      setCoverPreview(null);
      return;
    }

    const url = URL.createObjectURL(coverImage);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  useEffect(() => {
    if (!galleryImages) {
      setGalleryPreviews([]);
      return;
    }

    const urls = Array.from(galleryImages).map((file) => URL.createObjectURL(file));
    setGalleryPreviews(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [galleryImages]);

  useEffect(() => {
    if (!logoImage) {
      setLogoPreview(null);
      return;
    }

    const url = URL.createObjectURL(logoImage);
    setLogoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoImage]);

  const addService = () => {
    const value = serviceInput.trim();
    if (!value) return;
    if (!services.includes(value)) {
      setServices((current) => [...current, value]);
    }
    setServiceInput("");
  };

  const removeService = (serviceToRemove: string) => {
    setServices((current) => current.filter((service) => service !== serviceToRemove));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Create new business", {
      name,
      category,
      description,
      address,
      city,
      state,
      phone,
      whatsapp,
      services,
      openingHours,
      coverImage,
      galleryImages,
      logoImage,
    });
    router.push("/merchant/dashboard");
  };

  return (
    <main className="container py-8">
      <section style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 className="text-4xl font-bold mb-4">Add New Business</h1>
        <p className="mb-6 text-slate-600">
          Create a new listing so customers can discover your products and services on Stall.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Business Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="e.g. Aya Flowers"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="e.g. Florist"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Tell customers what makes your business special"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Address</span>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Street address"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">City</span>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. Seattle"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">State</span>
              <input
                type="text"
                value={state}
                onChange={(event) => setState(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. Washington"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. 9876543210"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">WhatsApp</span>
              <input
                type="tel"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="e.g. 9876543210"
              />
            </label>
          </div>

          <div className="block">
            <span className="text-sm font-medium text-slate-700">Services</span>
            <div className="mt-2 flex flex-col gap-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(event) => setServiceInput(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Add a service, e.g. Bouquets"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => removeService(service)}
                    className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
                  >
                    {service} ×
                  </button>
                ))}
              </div>
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Opening Hours</span>
            <input
              type="text"
              value={openingHours}
              onChange={(event) => setOpeningHours(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="e.g. Mon-Fri 9am - 7pm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Cover Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setCoverImage(event.target.files?.[0] ?? null)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="mt-3 h-40 w-full rounded-3xl object-cover"
              />
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Gallery Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => setGalleryImages(event.target.files)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            {galleryPreviews.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {galleryPreviews.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Gallery preview"
                    className="h-28 w-full rounded-3xl object-cover"
                  />
                ))}
              </div>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setLogoImage(event.target.files?.[0] ?? null)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="mt-3 h-24 w-24 rounded-3xl object-cover"
              />
            ) : null}
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            Create business
          </button>
        </form>
      </section>
    </main>
  );
}
