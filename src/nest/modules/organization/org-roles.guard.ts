import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { OrgRole } from "#organization/domain";

import { ORG_ROLES_KEY } from "./org-roles.decorator";

@Injectable()
export class OrgRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<OrgRole[]>(
      ORG_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = this.getRequest(context);
    console.log("request", request.user, request.sub);
    return requiredRoles.some((role) => request.user.roles?.includes(role));
  }
}
