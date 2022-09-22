import { InMemorySearchableRepository } from "../../../shared/domain/repository/in-memory.repository";
import { SortDirection } from "../../../shared/domain/repository/repository-contracts";
import User from "../../domain/entities/user.entity";
import UserRepository from "../../domain/repository/user.repository";

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User>
  implements UserRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
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
