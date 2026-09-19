import { Injectable, NotFoundException } from "@nestjs/common";
import { AcquisitionRepository } from "./acquisition.repository";
import { CreateCandidateDto } from "./dto/create-candidate.dto";
import { AcquisitionStatus } from "@prisma/client";

@Injectable()
export class AcquisitionService {
  constructor(private readonly repo: AcquisitionRepository) {}

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
      throw new Error(`Invalid acquisition transition: ${current.status} → ${status}`);
    }
    return this.repo.update(id, {
      status,
      ...(status === "CONTACTED" ? { contactedAt: new Date() } : {}),
    });
  }
}
