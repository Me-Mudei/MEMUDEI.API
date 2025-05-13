import { Resolver } from "@nestjs/graphql";

import { MemberOutput } from "./dto/member.output";

@Resolver(() => MemberOutput)
export class MemberResolver {}
