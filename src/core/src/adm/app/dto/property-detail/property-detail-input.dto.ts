export type CreatePropertyDetailInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdatePropertyDetailInput = {
  key: string;
  name?: string;
  description?: string;
};
