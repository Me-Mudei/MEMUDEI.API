import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClassValidatorFields } from '#shared/domain';
import { PermissionProps } from '../entities/permission.entity';

export class PermissionRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor(props: PermissionProps) {
    Object.assign(this, props);
  }
}

export class PermissionValidator extends ClassValidatorFields<PermissionRules> {
  validate(data: PermissionProps): boolean {
    return super.validate(new PermissionRules(data ?? ({} as any)));
  }
}

export default class PermissionValidatorFactory {
  static create() {
    return new PermissionValidator();
  }
}
