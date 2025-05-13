import { Field, Int, ObjectType } from "@nestjs/graphql";

import { MerchantOutput } from "./merchant.output";

@ObjectType()
export class PaginateMerchantsOutput {
  @Field(() => [MerchantOutput])
  items: MerchantOutput[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  current_page: number;

  @Field(() => Int)
  last_page: number;

  @Field(() => Int)
  per_page: number;
}
