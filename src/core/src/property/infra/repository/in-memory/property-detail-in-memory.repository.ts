import { InMemorySearchableRepository } from '../#shared/domain/repository';
import { SortDirection } from '#sharedrepository';
import { PropertyDetail } from '../../../domain/entities';
import {
  PropertyDetailRepository,
  PropertyDetailFilter,
} from '../../../domain/repository';

export class PropertyDetailInMemoryRepository
  extends InMemorySearchableRepository<PropertyDetail>
  implements PropertyDetailRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: PropertyDetail[],
    filter: PropertyDetailFilter,
  ): Promise<PropertyDetail[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: PropertyDetail[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<PropertyDetail[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyDetailInMemoryRepository;
