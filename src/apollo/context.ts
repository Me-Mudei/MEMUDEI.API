import { AdmFacade } from "#adm/app";
import { AuthFacade } from "#auth/app";
import { AuthFacadeFactory } from "#auth/infra";
import { PropertyFacade } from "#property/app";
import {
  PropertyFacadeFactory,
  PropertyInMemoryFacadeFactory
} from "#property/infra";
import { ScheduleFacade } from "#schedule/app";
import {
  ScheduleFacadeFactory,
  ScheduleInMemoryFacadeFactory
} from "#schedule/infra";
import { UserFacade } from "#user/app";
import { UserFacadeFactory, UserInMemoryFacadeFactory } from "#user/infra";

export interface ContextInput {
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  headers: any;
}

export interface ContextInterface {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  scheduleService: ScheduleFacade;
  user?: {
    id: string;
    permissions: string[];
  };
  getContext(req: ContextInput): Promise<Context>;
  getTestContext(): Context;
}

export class Context implements ContextInterface {
  admService: AdmFacade;
  userService: UserFacade;
  propertyService: PropertyFacade;
  authService: AuthFacade;
  scheduleService: ScheduleFacade;
  user?: {
    id: string;
    permissions: string[];
  };
  async getContext(req: ContextInput) {
    this.admService = {} as any;
    this.authService = AuthFacadeFactory.create();
    this.userService = UserFacadeFactory.create();
    this.propertyService = PropertyFacadeFactory.create();
    this.scheduleService = ScheduleFacadeFactory.create();

    const token = req.headers.authorization ?? req.headers.Authorization;
    if (token) {
      try {
        const { permissions, user_id } = await this.authService.authenticate({
          token
        });
        this.user = { permissions, id: user_id };
      } catch (error) {
        console.log("error", error);
      }
    }
    return this;
  }
  getTestContext() {
    this.admService = {} as any;
    this.authService = AuthFacadeFactory.create();
    this.userService = UserInMemoryFacadeFactory.create();
    this.propertyService = PropertyInMemoryFacadeFactory.create();
    this.scheduleService = ScheduleInMemoryFacadeFactory.create();
    this.user = {
      id: "l5lgcQKhDqoDIOQYPBMj2",
      permissions: ["all"]
    };
    return this;
  }
}

export default Context;
