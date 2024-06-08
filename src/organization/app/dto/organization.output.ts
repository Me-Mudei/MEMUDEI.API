export type OrganizationOutput = {
  id: string;
  example: string;
  created_at: Date;
  updated_at: Date;
};

export class OrganizationOutputMapper {
  static toOutput(organization: any): OrganizationOutput {
    return {
      id: organization.id,
      example: organization.example,
      created_at: organization.created_at,
      updated_at: organization.updated_at,
    };
  }
}
