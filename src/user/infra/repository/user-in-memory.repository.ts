import { InMemorySearchableRepository, SortDirection } from "#shared/domain";

import { User } from "../../domain/entities";
import { UserRepository, UserFilter } from "../../domain/repository";

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User>
  implements UserRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: User[],
    filter: UserFilter
  ): Promise<User[]> {
    if (!filter || Object.keys(filter).length === 0) {
      return items;
    }
    for (const key in filter) {
      if (!filter[key]) {
        continue;
      }
      items = this[`${key}_filter`](items, filter[key]);
    }
    return items;
  }

  name_filter(items: User[], name: string): User[] {
    if (name.length < 3) return items;
    return items.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  email_filter(items: User[], email: string): User[] {
    if (email.length < 3) return items;
    return items.filter((item) => {
      return item.email.toLowerCase().includes(email.toLowerCase());
    });
  }

  external_id_filter(items: User[], external_id: string): User[] {
    if (external_id.length < 3) return items;
    return items.filter((item) => {
      return item.external_id.toLowerCase().includes(external_id.toLowerCase());
    });
  }

  property_id_filter(items: User[], property_id: string): User[] {
    if (property_id.length < 3) return items;
    return items.filter((item) => {
      return (item as any).properties.some((property) =>
        property.id.includes(property_id)
      );
    });
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default UserInMemoryRepository;
//validação
//implementar uma ordenação, ordenar por created_at
//testar filtro + ordenação
