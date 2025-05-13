import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetMerchantInput {
  @Field(() => String)
  id: string;
}
