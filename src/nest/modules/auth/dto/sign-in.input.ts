import { Field, InputType } from "@nestjs/graphql";
import { SignInInput as AuthSignInInput } from "#auth/app";
import { MutuallyExclusive } from "#nest/shared/validators/mutually-exclusive.validate";
import { RequiredIf } from "#nest/shared/validators/required-if.validate";
import { IsEmail, IsOptional } from "class-validator";

@InputType()
export class SignInInput implements AuthSignInInput {
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

  @MutuallyExclusive(["email", "password"], { nullable: true })
  @IsOptional()
  @Field(() => String, { nullable: true })
  googleToken?: string;
}
