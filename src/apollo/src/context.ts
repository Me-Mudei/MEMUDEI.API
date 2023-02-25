import { AdmFacade } from '@me-mudei/core/dist/adm/app/facade';
import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import { PropertyFacade } from '@me-mudei/core/dist/property/app/facade';
import {
  InMemoryFacadeFactory,
  PrismaFacadeFactory,
} from '@me-mudei/core/property';

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
    this.admService = {} as any;
    this.userService = {} as any;
    this.propertyService = PrismaFacadeFactory.create(req);
    return this;
  }
  getTestContext() {
    this.admService = {} as any;
    this.userService = {} as any;
    this.propertyService = InMemoryFacadeFactory.create({
      req_id: 'test',
      req_path: 'test',
      req_method: 'test',
      req_ua: 'test',
    });
    return this;
  }
}

export default Context;
