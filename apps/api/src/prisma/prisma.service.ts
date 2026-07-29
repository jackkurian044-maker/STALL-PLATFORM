import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { prisma } from "@stall/database";

// Thin wrapper so Nest can manage the Prisma client's lifecycle
// (connect on startup, disconnect on shutdown) while reusing the
// single shared client exported from @stall/database.
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  readonly client = prisma;

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
