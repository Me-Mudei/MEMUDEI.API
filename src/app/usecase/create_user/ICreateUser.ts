export type CreateUserInput = {
  name: string;
  email: string;
  phone: string;
  born: string;
  gender: 'M' | 'F';
  cpf: string;
  roleName: string;
  password: string;
  description?: string | null;
  address: {
    street: string;
    number: string;
    country: string;
    zipCode: string;
    neighborhood?: string | null;
    complement?: string | null;
  };
};

export type CreateUserOutput = {
  status: string;
  message: string;
};
