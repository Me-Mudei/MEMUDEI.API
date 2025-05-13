import { Member, OrgRole } from "../../domain";

export interface MemberOutput {
  id: string;
  org_role: OrgRole;
}

export class MemberOutputMapper {
  static toOutput(member: Member): MemberOutput {
    return {
      id: member.id,
      org_role: member.org_role,
    };
  }
}
