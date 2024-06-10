import { InputType, Field } from "@nestjs/graphql";
import { CreateMerchantInput as CoreCreateMerchantInput } from "#merchant/app";

@InputType()
export class CreateMerchantInput implements CoreCreateMerchantInput {
  @Field(() => String)
  example: string;
}
