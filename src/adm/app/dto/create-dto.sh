#!/bin/sh
FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}/${FILE_NAME[j]}-output.dto.ts
import { ${CLASS_NAME[j]} } from '../../../domain';

export type ${CLASS_NAME[j]}Output = {
  id: string;
  key: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
};

export class ${CLASS_NAME[j]}OutputMapper {
  static toOutput(entity: ${CLASS_NAME[j]}): ${CLASS_NAME[j]}Output {
    return entity.toJSON();
  }
}
EOF
done