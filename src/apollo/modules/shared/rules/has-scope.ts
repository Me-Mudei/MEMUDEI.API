import { ShieldCache, ruleType } from "nexus-shield";

export const hasScope = (scope: string) => {
  return ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, ctx) => {
      return ctx.user.permissions.includes(scope);
    }
  });
};
