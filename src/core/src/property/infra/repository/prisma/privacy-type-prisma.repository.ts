import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PrivacyType, PrivacyTypeRepository } from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class PrivacyTypePrismaRepository implements PrivacyTypeRepository {
  constructor(readonly prisma: PrismaClient) {}
  async findById(id: string | UniqueEntityId): Promise<PrivacyType> {
    const privacyType = await this.prisma.privacy_type
      .findFirstOrThrow({
        where: { id: `${id}` },
      })
      .catch((_err) => {
        throw new NotFoundError(`Privacy Type Not Found using ID ${id}`);
      });
    return new PrivacyType({
      id: new UniqueEntityId(privacyType.id),
      name: privacyType.name,
      description: privacyType.description,
      created_at: privacyType.created_at,
      updated_at: privacyType.updated_at,
    });
  }
}
