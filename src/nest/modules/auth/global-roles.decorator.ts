import { SetMetadata } from "@nestjs/common";
import { GlobalRole } from "#auth/domain";

export const GLOBAL_ROLES_KEY = "global_roles";
export const GlobalRoles = (...roles: GlobalRole[]) =>
  SetMetadata(GLOBAL_ROLES_KEY, roles);
