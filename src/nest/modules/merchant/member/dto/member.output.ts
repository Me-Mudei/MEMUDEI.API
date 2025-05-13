import { Field, ObjectType } from "@nestjs/graphql";
import { MemberOutput as CoreMemberOutput } from "#merchant/app";

import { OrgRole } from "../../dto/merchant.enum";

@ObjectType()
export class MemberOutput implements CoreMemberOutput {
  @Field(() => String)
  id: string;

  @Field(() => OrgRole)
  org_role: OrgRole;
}
