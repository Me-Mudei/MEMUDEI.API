import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import { PropertyFacade } from '@me-mudei/core/dist/property/app/facade';
import { InMemoryFacadeFactory as User } from '@me-mudei/core/user';
import { PrismaFacadeFactory as Property } from '@me-mudei/core/property';

export class Context {
  userService: UserFacade;
  propertyService: PropertyFacade;
  getContext(req: {
    req_id: string;
    req_path: string;
    req_method: string;
    req_ua: string;
  }) {
    this.userService = new User(req).create();
    this.propertyService = new Property(req).create();
    return this;
  }
}

export default Context;
