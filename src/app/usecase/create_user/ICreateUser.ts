export type CreateUserInput = {
  name: string;
  email: string;
  roleName: string;
};

export type CreateUserOutput = {
  status: string;
  message: string;
};
