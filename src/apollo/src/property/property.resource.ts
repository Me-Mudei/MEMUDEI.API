import { mutationField, nonNull } from 'nexus';
import { isAdmin } from '../shared/rules';

export const CreateProperty = mutationField('create_property', {
  type: 'property_output',
  shield: isAdmin(),
  args: { input: nonNull('create_property_input') },
  resolve: async (_, { input }, ctx) => {
    const res = ctx.propertyService.createProperty(input as any);
    return res as any;
  },
});
