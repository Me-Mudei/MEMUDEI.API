import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import { PropertyType, PropertyTypeRepository } from '../../../domain';

export class PropertyTypeInMemoryRepository implements PropertyTypeRepository {
  items: PropertyType[] = [];

  async findById(id: string | UniqueEntityId): Promise<PropertyType> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<PropertyType[]> {
    const _ids = ids.map((id) => `${id}`);
    const _items = _ids.map((id) => this._get(id));
    return Promise.all(_items);
  }

  protected async _get(id: string): Promise<PropertyType> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}
