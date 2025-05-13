import { ClassValidatorFields } from "#shared/domain";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { MemberProps, OrgRole } from "../entities/member.entity";

export class MemberRules {
  @IsString()
  @IsNotEmpty()
  org_role: OrgRole;

  constructor({ org_role }: MemberProps) {
    Object.assign(this, {
      org_role,
    });
  }
}

export class MemberValidator extends ClassValidatorFields<MemberRules> {
  validate(data: MemberProps): boolean {
    return super.validate(new MemberRules(data ?? ({} as any)));
  }
}

export default class MemberValidatorFactory {
  static create() {
    return new MemberValidator();
  }
}
