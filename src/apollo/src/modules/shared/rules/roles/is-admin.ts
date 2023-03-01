import { generic, ruleType, ShieldCache } from 'nexus-shield';

export const isAdmin = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, ctx) => {
      return ctx.user.role.name === 'admin';
    },
  }),
);
