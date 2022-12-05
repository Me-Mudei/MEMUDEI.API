import { InMemorySearchableRepository } from '../#shared/domain/repository';
import { SortDirection } from '#sharedrepository';
import { PropertyRelationship } from '../../../domain/entities';
import {
  PropertyRelationshipRepository,
  PropertyRelationshipFilter,
} from '../../../domain/repository';

export class PropertyRelationshipInMemoryRepository
  extends InMemorySearchableRepository<PropertyRelationship>
  implements PropertyRelationshipRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: PropertyRelationship[],
    filter: PropertyRelationshipFilter,
  ): Promise<PropertyRelationship[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: PropertyRelationship[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<PropertyRelationship[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyRelationshipInMemoryRepository;
