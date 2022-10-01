import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import { InMemoryFacadeFactory as User } from '@me-mudei/core/user';

export class Context {
  userService: UserFacade;
  getContext(req: {
    req_id: string;
    req_path: string;
    req_method: string;
    req_ua: string;
  }) {
    this.userService = new User(req).create();
    return this;
  }
}

export default Context;
