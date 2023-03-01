import { ruleType } from 'nexus-shield';

export const hasScope = (scope: string) => {
  return ruleType({
    resolve: async (_root, _args, ctx) =>
      ctx.authService.authorize({ user_id: ctx.user.id, scope }),
  });
};
