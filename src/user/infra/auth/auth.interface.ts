import { User } from "#user/domain";

export type SignupUserInput = {
  email: string;
  password: string;
  name: string;
};

export interface Auth {
  signup(input: SignupUserInput): Promise<User>;
}
