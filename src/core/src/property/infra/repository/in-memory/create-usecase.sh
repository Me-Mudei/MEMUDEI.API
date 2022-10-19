#!/bin/sh

FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")
ACTION_NAME=Insert

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}-in-memory.repository.ts
import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { ${CLASS_NAME[j]}, ${CLASS_NAME[j]}Repository } from '../../../domain';

export class ${CLASS_NAME[j]}InMemoryRepository implements ${CLASS_NAME[j]}Repository {
  items: ${CLASS_NAME[j]}[] = [];

  async findById(id: string | UniqueEntityId): Promise<${CLASS_NAME[j]}> {
    const _id = \`\${id}\`;
    return this._get(_id);
  }

  async findManyByIds(ids: string[] | UniqueEntityId[]): Promise<${CLASS_NAME[j]}[]> {
    const _ids = ids.map((id) => \`\${id}\`);
    const _items = this.items.filter((item) => _ids.includes(item.id));
    return _items;
  }

  protected async _get(id: string): Promise<${CLASS_NAME[j]}> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(\`Entity Not Found using ID \${id}\`);
    }
    return item;
  }
}
EOF
done