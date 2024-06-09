export interface AuthorizeInput {
  user_id: string;
  merchant_id: string;
  global_roles: string[];
  org_roles: string[];
}
