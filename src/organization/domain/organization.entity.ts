import { Entity, UniqueEntityId } from "#shared/domain";
export type OrganizationProps = {
  id?: UniqueEntityId;
  example: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Organization extends Entity<OrganizationProps> {
  constructor(props: OrganizationProps) {
    super(props);
  }
}
