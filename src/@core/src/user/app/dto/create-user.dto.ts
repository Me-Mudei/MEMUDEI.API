export type CreateUserInput = {
  name: string;
  email: string;
  role_name: string;
};

export type CreateUserOutput = {
  status: string;
  message: string;
};
