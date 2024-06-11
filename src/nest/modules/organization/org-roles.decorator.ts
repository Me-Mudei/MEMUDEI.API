import { SetMetadata } from "@nestjs/common";

import { OrgRole } from "./org-role.enum";

export const ORG_ROLES_KEY = "org_roles";
export const OrgRoles = (...roles: OrgRole[]) =>
  SetMetadata(ORG_ROLES_KEY, roles);
