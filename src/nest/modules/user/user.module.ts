import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserFacade } from '#user/app';
import { UserFacadeFactory } from '#user/infra';
import { SearchUsersResolver } from './search-users.resolver';

@Module({
  providers: [
    UserResolver,
    SearchUsersResolver,
    {
      provide: UserFacade,
      useFactory: () => UserFacadeFactory.create(),
    },
  ],
})
export class UserModule {}
