import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import {
  CondominiumDetail,
  CondominiumDetailRepository,
} from '../../../domain';
import { PrismaClient } from '../../../../shared/infra/database';

export class CondominiumDetailPrismaRepository
  implements CondominiumDetailRepository
{
  constructor(readonly prisma: PrismaClient) {}

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<CondominiumDetail[]> {
    const condominiumDetailsDatabase =
      await this.prisma.condominium_detail.findMany({
        where: {
          id: {
            in: ids.map((id) => `${id}`),
          },
        },
      });
    ids.map((id) => {
      if (!condominiumDetailsDatabase.find((c) => c.id === `${id}`)) {
        throw new NotFoundError(`Condominium Detail Not Found using ID ${id}`);
      }
    });
    const condominiumDetails = condominiumDetailsDatabase.map(
      (condominiumDetail) =>
        new CondominiumDetail({
          id: new UniqueEntityId(condominiumDetail.id),
          name: condominiumDetail.name,
          description: condominiumDetail.description,
          created_at: condominiumDetail.created_at,
          updated_at: condominiumDetail.updated_at,
        }),
    );
    return condominiumDetails;
  }
}
