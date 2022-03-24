export type CepSuccessResponse = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
};

export type CepErrorResponse = {
  name: string;
  message: string;
  type: string;
  errors: any[];
};
