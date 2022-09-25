import { generic, ruleType, ShieldCache } from 'nexus-shield';

export const isAdmin = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, _ctx) => {
      return true;
    },
  }),
);
