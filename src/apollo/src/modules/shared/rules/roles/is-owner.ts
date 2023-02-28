import { ruleType, ShieldCache } from 'nexus-shield';

export const isOwner = ruleType({
  cache: ShieldCache.CONTEXTUAL,
  resolve: (_root, _args, _ctx) => {
    return true;
  },
});
