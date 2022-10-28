import { InMemorySearchableRepository } from '../../../../shared/domain/repository';
import { SortDirection } from '../../../../shared/domain/repository';
import { PropertyType } from '../../../domain/entities';
import {
  PropertyTypeRepository,
  PropertyTypeFilter,
} from '../../../domain/repository';

export class PropertyTypeInMemoryRepository
  extends InMemorySearchableRepository<PropertyType>
  implements PropertyTypeRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: PropertyType[],
    filter: PropertyTypeFilter,
  ): Promise<PropertyType[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: PropertyType[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<PropertyType[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyTypeInMemoryRepository;
