import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFacade } from '#user/app';
import { UserFacadeFactory } from '#user/infra';

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
