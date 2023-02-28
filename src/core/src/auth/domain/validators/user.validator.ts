import { IsDate, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { UserProps } from '../entities/user.entity';

export class UserRules {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: UserProps) {
    Object.assign(this, props);
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }
}

export default class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
