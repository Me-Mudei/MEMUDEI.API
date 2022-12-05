import { InMemorySearchableRepository } from '../#shared/domain/repository';
import { SortDirection } from '#sharedrepository';
import { User } from '../../../domain/entities';
import { UserRepository, UserFilter } from '../../../domain/repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User>
  implements UserRepository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: User[],
    filter: UserFilter,
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.id.toString().toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default UserInMemoryRepository;
