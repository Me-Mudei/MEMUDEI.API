#!/bin/sh
FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}.repository.ts
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '#shared/domain';
import { ${CLASS_NAME[j]} } from '../entities';

export type ${CLASS_NAME[j]}Filter = string;

export class ${CLASS_NAME[j]}SearchParams extends DefaultSearchParams<${CLASS_NAME[j]}Filter> {}

export class ${CLASS_NAME[j]}SearchResult extends DefaultSearchResult<
  ${CLASS_NAME[j]},
  ${CLASS_NAME[j]}Filter
> {}

export type ${CLASS_NAME[j]}Repository = SearchableRepositoryInterface<
  ${CLASS_NAME[j]},
  ${CLASS_NAME[j]}Filter,
  ${CLASS_NAME[j]}SearchParams,
  ${CLASS_NAME[j]}SearchResult
>;
EOF
done