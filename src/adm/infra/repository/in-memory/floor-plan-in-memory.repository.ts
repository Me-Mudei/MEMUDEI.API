import { InMemorySearchableRepository } from '#shared/domain';
import { SortDirection } from '#shared/domain';
import { FloorPlan } from '../../../domain/entities';
import {
  FloorPlanRepository,
  FloorPlanFilter,
} from '../../../domain/repository';

export class FloorPlanInMemoryRepository
  extends InMemorySearchableRepository<FloorPlan>
  implements FloorPlanRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: FloorPlan[],
    filter: FloorPlanFilter,
  ): Promise<FloorPlan[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: FloorPlan[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<FloorPlan[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default FloorPlanInMemoryRepository;
