import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const GetPrivacyType = queryField('get_privacy_type', {
  type: 'privacy_type_output',
  args: { input: nonNull('get_privacy_type_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.getPrivacyType(input as any);
  },
});

export const SearchPrivacyTypes = queryField('search_privacy_types', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.searchPrivacyType(input as any) as any;
  },
});

export const CreatePrivacyType = mutationField('create_privacy_type', {
  type: 'privacy_type_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_privacy_type_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.createPrivacyType(input as any);
  },
});

export const UpdatePrivacyType = mutationField('update_privacy_type', {
  type: 'privacy_type_output',
  shield: isAdmin(),
  args: { input: nonNull('update_privacy_type_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.admService.updatePrivacyType(input as any);
  },
});

export const DeletePrivacyType = mutationField('delete_privacy_types', {
  type: 'privacy_type_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_privacy_type_input')) },
  resolve: async (_, { input }, ctx) => {
    await ctx.admService.deletePrivacyType(input as any);
    return { id: input[0].id };
  },
});
