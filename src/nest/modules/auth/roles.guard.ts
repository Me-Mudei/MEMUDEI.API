import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthFacade } from "#auth/app";
import { GlobalRole } from "#auth/domain";

import { OrgRole } from "../organization/org-role.enum";
import { ORG_ROLES_KEY } from "../organization/org-roles.decorator";

import { GLOBAL_ROLES_KEY } from "./global-roles.decorator";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade,
    private reflector: Reflector,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const globalRoles = this.reflector.getAllAndOverride<GlobalRole[]>(
      GLOBAL_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const orgRoles = this.reflector.getAllAndOverride<OrgRole[]>(
      ORG_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = this.getRequest(context);
    return this.authFacade.authorize({
      user_id: request.user.id ?? "",
      merchant_id: request.headers["x-merchant-id"] ?? "",
      global_roles: globalRoles ?? [],
      org_roles: orgRoles ?? [],
    });
  }
}
