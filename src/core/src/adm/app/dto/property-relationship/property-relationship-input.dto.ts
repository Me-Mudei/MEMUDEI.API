export type CreatePropertyRelationshipInput = {
  key: string;
  name: string;
  description?: string;
};

export type UpdatePropertyRelationshipInput = {
  key: string;
  name?: string;
  description?: string;
};
