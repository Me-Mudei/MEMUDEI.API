export type CreatePropertyTypeInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdatePropertyTypeInput = {
  key: string;
  name?: string;
  description?: string;
};
