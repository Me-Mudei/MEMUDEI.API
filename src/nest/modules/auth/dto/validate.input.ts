import { ValidateInput } from "#auth/app";

export class ValidateDto implements ValidateInput {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}
