import { Field, InputType } from "@nestjs/graphql";
import { MutuallyExclusive } from "#nest/shared/validators/mutually-exclusive.validate";
import { RequiredIf } from "#nest/shared/validators/required-if.validate";
import { IsDate, IsEmail, IsOptional } from "class-validator";

@InputType()
export class SignUpInput {
  @MutuallyExclusive(["googleToken"], { nullable: true })
  @RequiredIf(["password"])
  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @MutuallyExclusive(["googleToken"], { nullable: true })
  @RequiredIf(["email"])
  @IsOptional()
  @Field(() => String, { nullable: true })
  password?: string;

  @MutuallyExclusive(["googleToken"], { nullable: true })
  @RequiredIf(["email", "password"])
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @MutuallyExclusive(["email", "password", "name"], { nullable: true })
  @IsOptional()
  @Field(() => String, { nullable: true })
  googleToken?: string;
}
