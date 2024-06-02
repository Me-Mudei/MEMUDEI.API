import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetPropertyInput {
  @Field(() => String)
  id: string;
}
