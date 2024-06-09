import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard as NestAuthGuard } from "@nestjs/passport";
import { OrgRole } from "#organization/domain";

import { ORG_ROLES_KEY } from "../organization/org-roles.decorator";

import { GlobalRole } from "./dto/global-role.enum";
import { GLOBAL_ROLES_KEY } from "./global-roles.decorator";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard extends NestAuthGuard("jwt") implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

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
    const requiredGlobalRoles = this.reflector.getAllAndOverride<GlobalRole[]>(
      GLOBAL_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredOrgRoles = this.reflector.getAllAndOverride<OrgRole[]>(
      ORG_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = this.getRequest(context);
    let hasAuthorization = false;
    if (
      requiredGlobalRoles &&
      requiredGlobalRoles.some((role) => request.user.global_role === role)
    ) {
      return super.canActivate(context) as boolean;
    }
    if (requiredOrgRoles) {
      const merchantId = request.headers["x-merchant-id"];
      if (!merchantId) {
        return false;
      }
      hasAuthorization = requiredOrgRoles.some((role) =>
        request.user.roles?.includes(role),
      );
    }

    return super.canActivate(context) as boolean;
  }
}
