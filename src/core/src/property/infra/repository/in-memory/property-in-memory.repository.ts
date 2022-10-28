import { InMemorySearchableRepository } from '../../../../shared/domain/repository';
import { SortDirection } from '../../../../shared/domain/repository';
import { Property } from '../../../domain/entities';
import { PropertyRepository, PropertyFilter } from '../../../domain/repository';

export class PropertyInMemoryRepository
  extends InMemorySearchableRepository<Property>
  implements PropertyRepository
{
  sortableFields: string[] = ['title', 'created_at'];

  protected async applyFilter(
    items: Property[],
    filter: PropertyFilter,
  ): Promise<Property[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.title.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Property[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Property[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyInMemoryRepository;
