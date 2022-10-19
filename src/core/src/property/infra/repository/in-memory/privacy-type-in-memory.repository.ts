import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PrivacyType, PrivacyTypeRepository } from '../../../domain';

export class PrivacyTypeInMemoryRepository implements PrivacyTypeRepository {
  items: PrivacyType[] = [];

  async findById(id: string | UniqueEntityId): Promise<PrivacyType> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<PrivacyType[]> {
    const _ids = ids.map((id) => `${id}`);
    const _items = _ids.map((id) => this._get(id));
    return Promise.all(_items);
  }

  protected async _get(id: string): Promise<PrivacyType> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}
