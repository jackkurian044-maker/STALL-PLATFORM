import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, AcquisitionStatus } from "@prisma/client";

@Injectable()
export class AcquisitionRepository {
  constructor(private readonly prisma: PrismaService) {}

  list(status?: AcquisitionStatus) {
    return this.prisma.client.acquisitionCandidate.findMany({
      where: status ? { status } : {},
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    });
  }

  create(data: Prisma.AcquisitionCandidateCreateInput) {
    return this.prisma.client.acquisitionCandidate.create({ data });
  }

  findById(id: string) {
    return this.prisma.client.acquisitionCandidate.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.AcquisitionCandidateUpdateInput) {
    return this.prisma.client.acquisitionCandidate.update({ where: { id }, data });
  }
}
