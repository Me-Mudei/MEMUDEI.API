export type CreatePrivacyTypeInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdatePrivacyTypeInput = {
  key: string;
  name?: string;
  description?: string;
};
