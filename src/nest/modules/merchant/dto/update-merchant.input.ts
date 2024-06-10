import { InputType, Field } from "@nestjs/graphql";
import { CreateMerchantInput as CoreCreateMerchantInput } from "#merchant/app";

@InputType()
export class UpdateMerchantInput implements CoreCreateMerchantInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  example: string;
}
