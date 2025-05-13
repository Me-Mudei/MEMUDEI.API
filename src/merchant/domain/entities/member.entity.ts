import { Entity, EntityValidationError, UniqueEntityId } from "#shared/domain";

import MemberValidatorFactory from "../validators/member.validator";

export enum OrgRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

export type MemberProps = {
  id?: UniqueEntityId;
  org_role: OrgRole;
};

export class Member extends Entity<MemberProps> {
  private _org_role: OrgRole;

  constructor(readonly props: MemberProps) {
    Member.validate(props);
    super(props);
    this._org_role = props.org_role;
  }

  static validate(props: MemberProps) {
    const validator = MemberValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get org_role() {
    return this._org_role;
  }
  set org_role(org_role) {
    this._org_role = org_role;
  }
}
