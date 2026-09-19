import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AcquisitionRepository } from "./acquisition.repository";
import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { AcquisitionStatus } from "@prisma/client";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "business";
}

function claimCode() {
  return `STL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

@Injectable()
export class AcquisitionService {
  constructor(private readonly repo: AcquisitionRepository, private readonly prisma: PrismaService) {}

  list(status?: AcquisitionStatus) {
    return this.repo.list(status);
  }

  create(dto: CreateCandidateDto) {
    return this.repo.create({
      source: dto.source ?? "manual",
      externalId: dto.externalId,
      name: dto.name,
      category: dto.category ?? "",
      address: dto.address ?? "",
      neighbourhood: dto.neighbourhood ?? "",
      phone: dto.phone ?? "",
      whatsapp: dto.whatsapp ?? "",
      latitude: dto.latitude,
      longitude: dto.longitude,
      rating: dto.rating,
      reviewCount: dto.reviewCount,
      notes: dto.notes ?? "",
    });
  }

  async setStatus(id: string, status: AcquisitionStatus) {
    const current = await this.repo.findById(id);
    if (!current) throw new NotFoundException("Acquisition candidate not found");

    const allowed: Record<AcquisitionStatus, AcquisitionStatus[]> = {
      DISCOVERED: ["SHORTLISTED", "REJECTED", "DUPLICATE"],
      SHORTLISTED: ["APPROVED", "REJECTED", "DUPLICATE"],
      APPROVED: ["IMPORTED", "REJECTED"],
      REJECTED: ["SHORTLISTED"],
      DUPLICATE: [],
      IMPORTED: ["CONTACTED"],
      CONTACTED: ["CLAIMED"],
      CLAIMED: [],
    };
    if (status === current.status) return current;
    if (!allowed[current.status].includes(status)) {
      throw new ConflictException(`Invalid acquisition transition: ${current.status} → ${status}`);
    }
    return this.repo.update(id, {
      status,
      ...(status === "CONTACTED" ? { contactedAt: new Date() } : {}),
    });
  }

  async importApproved(id: string) {
    const candidate = await this.repo.findById(id);
    if (!candidate) throw new NotFoundException("Acquisition candidate not found");
    if (candidate.status !== "APPROVED") throw new ConflictException("Only APPROVED candidates can be imported");
    if (!candidate.latitude || !candidate.longitude) throw new ConflictException("Candidate needs latitude and longitude before import");

    const existing = await this.prisma.client.business.findFirst({
      where: {
        OR: [
          ...(candidate.phone ? [{ phone: candidate.phone }] : []),
          { name: { equals: candidate.name } },
        ],
      },
    });
    if (existing) {
      await this.repo.update(id, { status: "DUPLICATE", importedBusinessId: existing.id });
      throw new ConflictException(`Matching STall business already exists: ${existing.name}`);
    }

    const categoryName = candidate.category || "Restaurant";
    const categorySlug = slugify(categoryName);
    let category = await this.prisma.client.category.findFirst({ where: { OR: [{ name: categoryName }, { slug: categorySlug }] } });
    if (!category) {
      category = await this.prisma.client.category.create({ data: { name: categoryName, slug: categorySlug, icon: "🍴" } });
    }

    const baseSlug = slugify(candidate.name);
    let slug = baseSlug;
    let suffix = 2;
    while (await this.prisma.client.business.findUnique({ where: { slug } })) slug = `${baseSlug}-${suffix++}`;

    const claimId = candidate.claimId || claimCode();
    const business = await this.prisma.client.business.create({
      data: {
        name: candidate.name,
        slug,
        description: `${candidate.name} — local business listing on STall.`,
        address: candidate.address || candidate.neighbourhood || "India",
        neighbourhood: candidate.neighbourhood || candidate.address || "",
        latitude: candidate.latitude,
        longitude: candidate.longitude,
        phone: candidate.phone,
        whatsapp: candidate.whatsapp || candidate.phone,
        rating: candidate.rating ?? 0,
        reviewCount: candidate.reviewCount ?? 0,
        claimStatus: "UNCLAIMED",
        category: { connect: { id: category.id } },
      },
    });

    const updated = await this.repo.update(id, {
      status: "IMPORTED",
      importedBusinessId: business.id,
      claimId,
    });
    return { candidate: updated, business, claimId };
  }

  async outreach(id: string) {
    const candidate = await this.repo.findById(id);
    if (!candidate) throw new NotFoundException("Acquisition candidate not found");
    if (!candidate.claimId || !candidate.importedBusinessId) throw new ConflictException("Candidate must be imported before outreach");

    const businessUrl = process.env.STALL_PUBLIC_URL || "http://localhost:3000";
    const claimLink = `${businessUrl}/?claim=${encodeURIComponent(candidate.claimId)}`;
    const text = [
      `Hello ${candidate.name},`,
      "",
      "We’ve added your business to STall, a platform that helps customers discover local businesses around them.",
      "",
      "🎉 Your STall listing is FREE.",
      "",
      "You can claim the listing and manage your business information.",
      "",
      "Your business always stays yours. You remain in control while STall helps you build your presence and reach more customers.",
      "",
      `Your Claim ID: ${candidate.claimId}`,
      `Claim your business: ${claimLink}`,
      "",
      "There is no payment required to claim your free listing.",
      "",
      "STall — Find what’s around you.",
    ].join("\n");

    await this.repo.update(id, { status: "CONTACTED", contactedAt: new Date() });
    const phone = (candidate.whatsapp || candidate.phone).replace(/[^0-9]/g, "");
    return { claimId: candidate.claimId, claimLink, message: text, whatsappUrl: phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : null };
  }
}
