import { NotFoundError, UniqueEntityId } from '#shared/domain';
import {
  PrivacyType,
  PrivacyTypeRepository,
  PrivacyTypeSearchParams,
  PrivacyTypeSearchResult,
} from '../../../domain';
import { PrismaClient } from '#sharedatabase';

export class PrivacyTypePrismaRepository implements PrivacyTypeRepository {
  sortableFields: string[] = ['createdAt'];
  constructor(readonly prisma: PrismaClient) {}

  async insert(entity: PrivacyType): Promise<void> {
    await this.prisma.privacy_type.create({
      data: {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        created_at: entity.created_at,
        updated_at: entity.updated_at,
      },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<PrivacyType> {
    const privacyType = await this.prisma.privacy_type
      .findFirstOrThrow({
        where: { id: id.toString() },
      })
      .catch((_err) => {
        throw new NotFoundError(`Entity Not Found using ID ${id}`);
      });

    return this.toEntity(privacyType);
  }

  async findManyById(ids: (string | UniqueEntityId)[]): Promise<PrivacyType[]> {
    const privacyType = await this.prisma.privacy_type.findMany({
      where: {
        id: {
          in: ids.map((id) => id.toString()),
        },
      },
    });
    return privacyType.map((condominiumDetail) =>
      this.toEntity(condominiumDetail),
    );
  }

  async findAll(): Promise<PrivacyType[]> {
    const privacyTypes = await this.prisma.privacy_type.findMany();
    return privacyTypes.map((privacyType) => this.toEntity(privacyType));
  }

  async update(entity: PrivacyType): Promise<void> {
    await this.prisma.privacy_type.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        description: entity.description,
      },
    });
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    await this.prisma.privacy_type.delete({
      where: { id: id.toString() },
    });
  }

  async search(
    props: PrivacyTypeSearchParams,
  ): Promise<PrivacyTypeSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const privacyTypes = await this.prisma.privacy_type.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        ...(props.sort && this.sortableFields.includes(props.sort)
          ? { [props.sort]: props.sort_dir }
          : { created_at: 'asc' }),
      },
    });
    return new PrivacyTypeSearchResult({
      items: privacyTypes.map((privacyType) => this.toEntity(privacyType)),
      current_page: props.page,
      per_page: props.per_page,
      total: privacyTypes.length,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private toEntity(entity: any): PrivacyType {
    return new PrivacyType({
      id: new UniqueEntityId(entity.id),
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}
