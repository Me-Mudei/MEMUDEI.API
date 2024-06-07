import { InMemorySearchableRepository } from "#shared/domain";
import { SortDirection } from "#shared/domain";

import { Charge } from "../../../domain/entities";
import { ChargeRepository, ChargeFilter } from "../../../domain/repository";

export class ChargeInMemoryRepository
  extends InMemorySearchableRepository<Charge>
  implements ChargeRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Charge[],
    filter: ChargeFilter,
  ): Promise<Charge[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Charge[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Charge[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default ChargeInMemoryRepository;
