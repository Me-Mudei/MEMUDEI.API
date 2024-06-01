import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileOutput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  external_id!: string;

  @Field(() => String)
  url!: string;

  @Field(() => String)
  filename!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String, { nullable: true })
  relation?: string | null;

  @Field(() => Date)
  created_at!: Date;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | null;
}
