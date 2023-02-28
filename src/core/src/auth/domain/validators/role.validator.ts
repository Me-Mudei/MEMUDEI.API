import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { RoleProps } from '../entities/role.entity';

export class RoleRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: RoleProps) {
    Object.assign(this, props);
  }
}

export class RoleValidator extends ClassValidatorFields<RoleRules> {
  validate(data: RoleProps): boolean {
    return super.validate(new RoleRules(data ?? ({} as any)));
  }
}

export default class RoleValidatorFactory {
  static create() {
    return new RoleValidator();
  }
}
