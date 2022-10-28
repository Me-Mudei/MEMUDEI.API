#!/bin/sh

FILE_NAME=("property-type" "property-relationship" "privacy-type" "property-detail" "condominium-detail" "rule")
VALUE_NAME=("property_type" "property_relationship" "privacy_type" "property_detail" "condominium_detail" "rule")
CLASS_NAME=("PropertyType" "PropertyRelationship" "PrivacyType" "PropertyDetail" "CondominiumDetail" "Rule")
VAR_NAME=("propertyType" "propertyRelationship" "privacyType" "propertyDetail" "condominiumDetail" "rule")

length=6

for (( j=0; j<${length}; j++ ));
do
cat <<EOF >> ${FILE_NAME[j]}-prisma.repository.ts
import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import {
  ${CLASS_NAME[j]},
  ${CLASS_NAME[j]}Repository,
  ${CLASS_NAME[j]}SearchParams,
  ${CLASS_NAME[j]}SearchResult,
} from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class ${CLASS_NAME[j]}PrismaRepository
  implements ${CLASS_NAME[j]}Repository
{
  sortableFields: string[] = ['createdAt'];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: ${CLASS_NAME[j]}): Promise<void> {
    await this.prisma.${VALUE_NAME[j]}.create({
      data: {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<${CLASS_NAME[j]}> {
    const ${VAR_NAME[j]} = await this.prisma.${VALUE_NAME[j]}
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(\`Entity Not Found using ID \${id}\`);
      });

    return this.toEntity(${VAR_NAME[j]});
  }

  async findAll(): Promise<${CLASS_NAME[j]}[]> {
    const ${VAR_NAME[j]}s = await this.prisma.${VALUE_NAME[j]}.findMany();
    return ${VAR_NAME[j]}s.map((${VAR_NAME[j]}) =>
      this.toEntity(${VAR_NAME[j]}),
    );
  }

  async update(entity: ${CLASS_NAME[j]}): Promise<void> {
    await this.prisma.${VALUE_NAME[j]}.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.${VALUE_NAME[j]}.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: ${CLASS_NAME[j]}SearchParams,
  ): Promise<${CLASS_NAME[j]}SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const ${VAR_NAME[j]}s = await this.prisma.${VALUE_NAME[j]}.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
    });
    return new ${CLASS_NAME[j]}SearchResult({
      items: ${VAR_NAME[j]}s.map((${VAR_NAME[j]}) =>
        this.toEntity(${VAR_NAME[j]}),
      ),
      current_page: props.page,
      per_page: props.per_page,
      total: ${VAR_NAME[j]}s.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): ${CLASS_NAME[j]} {
    return new ${CLASS_NAME[j]}({
      id: new UniqueEntityId(entity.id),
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}

EOF
done