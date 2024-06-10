import { ObjectType, Field } from "@nestjs/graphql";
import { MerchantOutput as CoreMerchantOutput } from "#merchant/app";

@ObjectType()
export class MerchantOutput implements CoreMerchantOutput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  company_name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
