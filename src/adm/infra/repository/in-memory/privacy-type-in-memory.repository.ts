import { InMemorySearchableRepository } from "#shared/domain";
import { SortDirection } from "#shared/domain";

import { PrivacyType } from "../../../domain/entities";
import {
  PrivacyTypeRepository,
  PrivacyTypeFilter,
} from "../../../domain/repository";

export class PrivacyTypeInMemoryRepository
  extends InMemorySearchableRepository<PrivacyType>
  implements PrivacyTypeRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: PrivacyType[],
    filter: PrivacyTypeFilter,
  ): Promise<PrivacyType[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: PrivacyType[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<PrivacyType[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default PrivacyTypeInMemoryRepository;
