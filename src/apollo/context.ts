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
import {
  InMemoryFacadeFactory as InMemoryUserFacadeFactory,
  PrismaFacadeFactory as PrismaUserFacadeFactory,
} from '#user/infra';

export interface ContextInput {
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  headers: any;
}

export interface Context {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  user_id?: string;
  getContext(req: ContextInput): Promise<Context>;
  getTestContext(): Context;
}

export class Context implements Context {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  user_id?: string;
  permissions?: string[];
  async getContext(req: ContextInput) {
    this.admService = {} as any;
    this.authService = PrismaAuthFacadeFactory.create(req);
    this.propertyService = PrismaPropertyFacadeFactory.create(req);
    this.userService = PrismaUserFacadeFactory.create(req);

    const token = req.headers.authorization;
    if (token) {
      try {
        const { permissions } = await this.authService.authenticate({ token });
        console.log('permissions', permissions);
        this.permissions = permissions;
      } catch (error) {
        console.log('error', error);
      }
    }
    this.user_id = 'l5lgcQKhDqoDIOQYPBMj2';
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
    this.userService = InMemoryUserFacadeFactory.create({ req } as any);
    this.authService = PrismaAuthFacadeFactory.create({ req } as any);
    this.propertyService = InMemoryPropertyFacadeFactory.create({ req } as any);
    this.user_id = 'l5lgcQKhDqoDIOQYPBMj2';
    return this;
  }
}

export default Context;
