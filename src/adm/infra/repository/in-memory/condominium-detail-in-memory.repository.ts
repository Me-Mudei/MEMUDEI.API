import { InMemorySearchableRepository } from "#shared/domain";
import { SortDirection } from "#shared/domain";

import { CondominiumDetail } from "../../../domain/entities";
import {
  CondominiumDetailRepository,
  CondominiumDetailFilter
} from "../../../domain/repository";

export class CondominiumDetailInMemoryRepository
  extends InMemorySearchableRepository<CondominiumDetail>
  implements CondominiumDetailRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: CondominiumDetail[],
    filter: CondominiumDetailFilter
  ): Promise<CondominiumDetail[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: CondominiumDetail[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<CondominiumDetail[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default CondominiumDetailInMemoryRepository;
