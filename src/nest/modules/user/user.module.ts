import { Module } from "@nestjs/common";
import { UserFacade } from "#user/app";
import { UserFacadeFactory } from "#user/infra";

import { UserResolver } from "./user.resolver";

@Module({
  providers: [
    UserResolver,
    {
      provide: UserFacade,
      useFactory: () => UserFacadeFactory.create(),
    },
  ],
})
export class UserModule {}
