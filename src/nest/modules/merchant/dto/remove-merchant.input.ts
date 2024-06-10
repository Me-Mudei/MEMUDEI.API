import { InputType, Field } from "@nestjs/graphql";
import { RemoveMerchantInput as CoreRemoveMerchantInput } from "#merchant/app";

@InputType()
export class RemoveMerchantInput implements CoreRemoveMerchantInput {
  @Field(() => String)
  id: string;
}
