import { InputType, Field } from "@nestjs/graphql";
import { UpdateMerchantInput as CoreUpdateMerchantInput } from "#merchant/app";

@InputType()
export class UpdateMerchantInput implements CoreUpdateMerchantInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  company_name: string;
}
