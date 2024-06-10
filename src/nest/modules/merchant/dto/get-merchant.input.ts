import { InputType, Field } from "@nestjs/graphql";
import { GetMerchantInput as CoreGetMerchantInput } from "#merchant/app";

@InputType()
export class GetMerchantInput implements CoreGetMerchantInput {
  @Field(() => String)
  id: string;
}
