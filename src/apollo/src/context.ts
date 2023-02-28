import { AdmFacade } from '@me-mudei/core/dist/adm/app/facade';
import { AuthFacade } from '@me-mudei/core/dist/auth/app/facade';
import { PropertyFacade } from '@me-mudei/core/dist/property/app/facade';
import { UserFacade } from '@me-mudei/core/dist/user/app/facade';
import {
  InMemoryFacadeFactory,
  PrismaFacadeFactory,
} from '@me-mudei/core/property';

export interface ContextInput {
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  headers: any;
}

export type User = {
  id: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
};

export interface Context {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  user?: User;
  getContext(req: ContextInput): Promise<Context>;
  getTestContext(): Context;
}

export class Context implements Context {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  user?: User;
  async getContext(req: ContextInput) {
    this.admService = {} as any;
    this.authService = {} as any;
    this.propertyService = PrismaFacadeFactory.create(req);
    this.userService = {} as any;

    const token = req.headers.authorization || '';
    const auth = await this.authService.authenticate(token);
    this.user = {
      id: auth.id,
      email: auth.email,
      role: {
        name: auth.role.name,
        permissions: auth.role.permissions,
      },
    };
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
