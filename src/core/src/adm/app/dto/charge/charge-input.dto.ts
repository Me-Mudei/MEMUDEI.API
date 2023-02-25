export type CreateChargeInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdateChargeInput = {
  key?: string;
  name?: string;
  description?: string;
};
