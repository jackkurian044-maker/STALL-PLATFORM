import { notFound } from "next/navigation";
import { getBusiness } from "../../../lib/api";
import BusinessHeader from "./BusinessHeader";
import BusinessGallery from "./BusinessGallery";
import BusinessInfo from "./BusinessInfo";
import BusinessServices from "./BusinessServices";
import BusinessActions from "./BusinessActions";
import BusinessReviews from "./BusinessReviews";

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusiness(slug);

  if (!business) {
    notFound();
  }

  const reviews =
    (business as { reviews?: { id: string; rating: number; comment: string; authorName: string; reply?: string | null }[] })
      .reviews ?? [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <BusinessHeader business={business} />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BusinessGallery business={business} />
          <BusinessInfo business={business} />
          <BusinessServices business={business} />
          <BusinessReviews businessId={business.id} initialReviews={reviews} />
        </div>
        <div>
          <BusinessActions business={business} />
        </div>
      </div>
    </main>
  );
}
