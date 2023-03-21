import { AdmFacade } from '#adm/app';
import { AuthFacade } from '#auth/app';
import { PropertyFacade } from '#property/app';
import { UserFacade } from '#user/app';
import {
  InMemoryFacadeFactory as InMemoryPropertyFacadeFactory,
  PrismaFacadeFactory as PrismaPropertyFacadeFactory,
} from '#property/infra';
import {
  InMemoryFacadeFactory as InMemoryAuthFacadeFactory,
  PrismaFacadeFactory as PrismaAuthFacadeFactory,
} from '#auth/infra';

export interface ContextInput {
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  headers: any;
}

export type User = {
  id: string;
  role: {
    name: string;
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
    this.authService = PrismaAuthFacadeFactory.create(req);
    this.propertyService = PrismaPropertyFacadeFactory.create(req);
    this.userService = {} as any;

    const token = req.headers.authorization;
    if (token) {
      this.user = await this.authService.authenticate({ token });
    }
    return this;
  }
  getTestContext() {
    const req = {
      req_id: 'test',
      req_path: 'test',
      req_method: 'test',
      req_ua: 'test',
    };
    this.admService = {} as any;
    this.userService = {} as any;
    this.authService = PrismaAuthFacadeFactory.create({ req } as any);
    this.propertyService = InMemoryPropertyFacadeFactory.create({ req } as any);
    this.user = { id: 'l5lgcQKhDqoDIOQYPBMj2', role: { name: 'ADMIN' } };
    return this;
  }
}

export default Context;
