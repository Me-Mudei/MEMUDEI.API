import { IsDate, IsOptional } from 'class-validator';
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields';
import { UserProps } from '../entities/user.entity';

export class UserRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ created_at }: UserProps) {
    Object.assign(this, { created_at });
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
