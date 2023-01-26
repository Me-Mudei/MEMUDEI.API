import { InMemorySearchableRepository } from '#shared/domain';
import { SortDirection } from '#shared/domain';
import { Schedule } from '../../../domain/entities';
import { ScheduleRepository, ScheduleFilter } from '../../../domain/repository';

export class ScheduleInMemoryRepository
  extends InMemorySearchableRepository<Schedule>
  implements ScheduleRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Schedule[],
    filter: ScheduleFilter,
  ): Promise<Schedule[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.id.toString().toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Schedule[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Schedule[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default ScheduleInMemoryRepository;
