import { ruleType, ShieldCache } from 'nexus-shield';

export const isAdvertiser = ruleType({
  cache: ShieldCache.CONTEXTUAL,
  resolve: (_root, _args, _ctx) => {
    return true;
  },
});
