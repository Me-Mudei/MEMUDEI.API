import { InMemorySearchableRepository } from '#shared/domain';
import { SortDirection } from '#shared/domain';
import { Rule } from '../../../domain/entities';
import { RuleRepository, RuleFilter } from '../../../domain/repository';

export class RuleInMemoryRepository
  extends InMemorySearchableRepository<Rule>
  implements RuleRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Rule[],
    filter: RuleFilter,
  ): Promise<Rule[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Rule[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Rule[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default RuleInMemoryRepository;
