export type CompleteUserInput = {
  name: string;
  email: string;
  phone: string;
  born: string;
  cpf: string;
  roleName: string;
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

export type CompleteUserOutput = {
  status: string;
  message: string;
};
