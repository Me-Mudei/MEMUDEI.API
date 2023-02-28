import { ruleType } from 'nexus-shield';

export const hasScope = (scope: string) => {
  return ruleType({
    resolve: (_root, _args, ctx) => {
      return ctx.user.role.permissions.includes(scope);
    },
  });
};
