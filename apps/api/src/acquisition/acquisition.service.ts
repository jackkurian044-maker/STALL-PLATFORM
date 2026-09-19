import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
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
      APPROVED: ["CONTACTED", "REJECTED", "FOLLOW_UP", "NOT_INTERESTED"],
      REJECTED: ["SHORTLISTED"],
      DUPLICATE: [],
      CONTACTED: ["INTERESTED", "FOLLOW_UP", "NOT_INTERESTED"],
      FOLLOW_UP: ["CONTACTED", "INTERESTED", "NOT_INTERESTED"],
      INTERESTED: ["READY_FOR_STALL", "NOT_INTERESTED"],
      NOT_INTERESTED: ["FOLLOW_UP"],
      READY_FOR_STALL: ["HANDED_OFF"],
      HANDED_OFF: [],
    };
    if (status === current.status) return current;
    if (!allowed[current.status].includes(status)) {
      throw new ConflictException(`Invalid acquisition transition: ${current.status} → ${status}`);
    }
    return this.repo.update(id, {
      status,
      ...(status === "CONTACTED" ? { contactedAt: new Date() } : {}),
      ...(status === "INTERESTED" ? { interestedAt: new Date() } : {}),
      ...(status === "HANDED_OFF" ? { handedOffAt: new Date() } : {}),
    });
  }


  async outreach(id: string) {
    const candidate = await this.repo.findById(id);
    if (!candidate) throw new NotFoundException("Acquisition candidate not found");
    if (!["APPROVED", "CONTACTED", "FOLLOW_UP"].includes(candidate.status)) {
      throw new ConflictException("Candidate must be approved for outreach");
    }

    const text = [
      "Hello " + candidate.name + ",",
      "",
      "We’re reaching out because we’d like to invite your business to be part of STall.",
      "",
      "STall helps customers discover local businesses around them.",
      "",
      "🎉 Your business can start with a FREE STall listing.",
      "",
      "If you’re interested, reply to us and we’ll help you get your business onto STall.",
      "",
      "Your business always stays yours. You remain in control while STall helps you build your presence and reach more customers.",
      "",
      "STall — Find what’s around you.",
    ].join("\n");

    await this.repo.update(id, { status: "CONTACTED", contactedAt: new Date() });
    const phone = (candidate.whatsapp || candidate.phone).replace(/[^0-9]/g, "");
    return {
      candidateId: candidate.id,
      message: text,
      whatsappUrl: phone ? "https://wa.me/" + phone + "?text=" + encodeURIComponent(text) : null,
    };
  }

  async handoff(id: string) {
    const candidate = await this.repo.findById(id);
    if (!candidate) throw new NotFoundException("Acquisition candidate not found");
    if (candidate.status !== "READY_FOR_STALL") {
      throw new ConflictException("Only READY_FOR_STALL candidates can be handed off");
    }

    const updated = await this.repo.update(id, { status: "HANDED_OFF", handedOffAt: new Date() });
    return {
      candidate: updated,
      handoff: {
        destination: "STall-App",
        message: "Business is interested in joining STall. Create the listing in STall-App and use the normal claim/onboarding flow.",
        sourceCandidateId: candidate.id,
      },
    };
  }

}
