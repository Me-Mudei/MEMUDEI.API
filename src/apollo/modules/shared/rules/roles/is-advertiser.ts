import { ruleType, ShieldCache } from 'nexus-shield';

export const isAdvertiser = ruleType({
  cache: ShieldCache.CONTEXTUAL,
  resolve: (_root, _args, ctx) => {
    return ctx.user.role.name === 'advertiser';
  },
});
