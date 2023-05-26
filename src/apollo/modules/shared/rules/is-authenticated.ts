import { ruleType, ShieldCache } from 'nexus-shield';

export const isAuthenticated = ruleType({
  cache: ShieldCache.CONTEXTUAL,
  resolve: (_root, _args, ctx) => {
    return !!ctx.user.id;
  },
});
