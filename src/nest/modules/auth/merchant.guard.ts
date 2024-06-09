import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class MerchantGuard implements CanActivate {
  constructor() {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const merchantId = request.headers["x-merchant-id"];
    if (!merchantId) {
      return false;
    }
    return true;
  }
}
