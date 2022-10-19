import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PropertyDetail, PropertyDetailRepository } from '../../../domain';

export class PropertyDetailInMemoryRepository
  implements PropertyDetailRepository
{
  items: PropertyDetail[] = [];

  async findById(id: string | UniqueEntityId): Promise<PropertyDetail> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<PropertyDetail[]> {
    const _ids = ids.map((id) => `${id}`);
    const _items = _ids.map((id) => this._get(id));
    return Promise.all(_items);
  }

  protected async _get(id: string): Promise<PropertyDetail> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}
