export type CreateCondominiumDetailInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdateCondominiumDetailInput = {
  key: string;
  name?: string;
  description?: string;
};
