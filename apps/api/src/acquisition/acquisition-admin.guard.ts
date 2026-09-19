import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AcquisitionAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const configuredKey = process.env.ACQUISITION_ADMIN_KEY;
    const providedKey = request.header("x-acquisition-admin-key");
    if (!configuredKey || !providedKey || providedKey !== configuredKey) {
      throw new UnauthorizedException("Admin acquisition access required");
    }
    return true;
  }
}
