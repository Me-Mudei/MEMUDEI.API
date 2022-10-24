#!/bin/sh
FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}.resource.ts
import { mutationField, queryField, nullable, nonNull, list } from 'nexus';
import { isAdmin } from '../../shared/rules';

export const Get${CLASS_NAME[j]} = queryField('get_${VALUE_NAME[j]}', {
  type: '${VALUE_NAME[j]}_output',
  args: { input: nonNull('get_${VALUE_NAME[j]}_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.get${CLASS_NAME[j]}(input as any);
  },
});

export const Search${CLASS_NAME[j]} = queryField('search_${VALUE_NAME[j]}', {
  type: 'pagination_output',
  shield: isAdmin(),
  args: { input: nullable('search_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.search${CLASS_NAME[j]}(input as any);
  },
});

export const Create${CLASS_NAME[j]} = mutationField('create_${VALUE_NAME[j]}', {
  type: '${VALUE_NAME[j]}_output',
  shield: isAdmin(),
  args: { input: list(nonNull('create_${VALUE_NAME[j]}_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.create${CLASS_NAME[j]}(input as any);
  },
});

export const Update${CLASS_NAME[j]} = mutationField('update_${VALUE_NAME[j]}', {
  type: '${VALUE_NAME[j]}_output',
  shield: isAdmin(),
  args: { input: nonNull('update_${VALUE_NAME[j]}_input') },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.update${CLASS_NAME[j]}(input as any);
  },
});

export const Delete${CLASS_NAME[j]} = mutationField('delete_${VALUE_NAME[j]}s', {
  type: '${VALUE_NAME[j]}_output',
  shield: isAdmin(),
  args: { input: list(nonNull('delete_${VALUE_NAME[j]}_input')) },
  resolve: async (_, { input }, ctx) => {
    return ctx.propertyService.delete${CLASS_NAME[j]}(input as any);
  },
});
EOF
done