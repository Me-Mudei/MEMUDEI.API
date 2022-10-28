#!/bin/sh

FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}-in-memory.repository.ts
import { InMemorySearchableRepository } from '../../../../shared/domain/repository';
import { SortDirection } from '../../../../shared/domain/repository';
import { ${CLASS_NAME[j]} } from '../../../domain/entities';
import { ${CLASS_NAME[j]}Repository, ${CLASS_NAME[j]}Filter } from '../../../domain/repository';

export class ${CLASS_NAME[j]}InMemoryRepository
  extends InMemorySearchableRepository<${CLASS_NAME[j]}>
  implements ${CLASS_NAME[j]}Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: ${CLASS_NAME[j]}[],
    filter: ${CLASS_NAME[j]}Filter,
  ): Promise<${CLASS_NAME[j]}[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: ${CLASS_NAME[j]}[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<${CLASS_NAME[j]}[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default ${CLASS_NAME[j]}InMemoryRepository;
EOF
done