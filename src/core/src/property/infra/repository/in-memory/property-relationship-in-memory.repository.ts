import { NotFoundError, UniqueEntityId } from '../../../../shared/domain';
import {
  PropertyRelationship,
  PropertyRelationshipRepository,
} from '../../../domain';

export class PropertyRelationshipInMemoryRepository
  implements PropertyRelationshipRepository
{
  items: PropertyRelationship[] = [];

  async findById(id: string | UniqueEntityId): Promise<PropertyRelationship> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findManyByIds(
    ids: string[] | UniqueEntityId[],
  ): Promise<PropertyRelationship[]> {
    const _ids = ids.map((id) => `${id}`);
    const _items = _ids.map((id) => this._get(id));
    return Promise.all(_items);
  }

  protected async _get(id: string): Promise<PropertyRelationship> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}
