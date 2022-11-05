import { InMemorySearchableRepository } from '../../../../shared/domain/repository';
import { SortDirection } from '../../../../shared/domain/repository';
import { Calendar } from '../../../domain/entities';
import { CalendarRepository, CalendarFilter } from '../../../domain/repository';

export class CalendarInMemoryRepository
  extends InMemorySearchableRepository<Calendar>
  implements CalendarRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Calendar[],
    filter: CalendarFilter,
  ): Promise<Calendar[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.id.toString().toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Calendar[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Calendar[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default CalendarInMemoryRepository;
