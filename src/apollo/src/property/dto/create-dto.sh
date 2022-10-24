#!/bin/sh
FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}.dto.ts
import { objectType, inputObjectType } from 'nexus';

export const ${CLASS_NAME[j]}Output = objectType({
  name: '${VALUE_NAME[j]}_output',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const Get${CLASS_NAME[j]}Input = inputObjectType({
  name: 'get_${VALUE_NAME[j]}_input',
  definition(t) {
    t.nonNull.string('id');
  },
});

export const Create${CLASS_NAME[j]}Input = inputObjectType({
  name: 'create_${VALUE_NAME[j]}_input',
  definition(t) {
    t.nonNull.string('name');
  },
});

export const Update${CLASS_NAME[j]}Input = inputObjectType({
  name: 'update_${VALUE_NAME[j]}_input',
  definition(t) {
    t.nonNull.string('id');
    t.nullable.string('name');
  },
});

export const Delete${CLASS_NAME[j]}Input = inputObjectType({
  name: 'delete_${VALUE_NAME[j]}_input',
  definition(t) {
    t.nonNull.string('id');
  },
});
EOF
done