export type CreateRuleInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdateRuleInput = {
  key: string;
  name?: string;
  description?: string;
};
