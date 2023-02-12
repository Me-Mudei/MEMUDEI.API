import { AdmFacade } from '@me-mudei/core/dist/adm/app/facade';
import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import { PropertyFacade } from '@me-mudei/core/dist/property/app/facade';
import { InMemoryFacadeFactory as Adm } from '@me-mudei/core/adm';
import { InMemoryFacadeFactory as User } from '@me-mudei/core/user';
import { InMemoryFacadeFactory as Property } from '@me-mudei/core/property';

export class Context {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  getContext(req: {
    req_id: string;
    req_path: string;
    req_method: string;
    req_ua: string;
  }) {
    this.admService = Adm.create(req);
    this.userService = User.create(req);
    this.propertyService = Property.create(req);
    return this;
  }
}

export default Context;
