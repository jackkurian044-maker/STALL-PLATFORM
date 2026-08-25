import { getBusiness } from "@/lib/business";
import { notFound } from "next/navigation";
import BusinessActions from "../BusinessActions";
import BusinessGallery from "../BusinessGallery";
import BusinessHeader from "../BusinessHeader";
import BusinessInfo from "../BusinessInfo";
import BusinessReviews from "../BusinessReviews";
import BusinessServices from "../BusinessServices";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const business = getBusiness(id);

  if (!business) {
    notFound();
  }

  return (
    <main className="container py-8">
      <BusinessHeader
        name={business.name}
        rating={business.rating.toString()}
        category={business.category}
        location={`${business.city}, ${business.state}`}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-8">
          <BusinessInfo
            description={business.description}
            address={`${business.address}, ${business.city}, ${business.state}`}
            hours={business.isOpen ? "Open now" : "Closed"}
          />
          <BusinessGallery images={business.images} />
          <BusinessServices services={business.services} />
        </div>

        <div className="space-y-8">
          <BusinessActions phone={business.phone} whatsapp={business.whatsapp} />
          <BusinessReviews businessId={business.id} />
        </div>
      </div>
    </main>
  );
}
