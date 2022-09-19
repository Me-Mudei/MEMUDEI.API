import Entity from "@core/@shared/domain/entity/entity";
import UniqueEntityId from "@core/@shared/domain/value-objects/unique-entity-id.vo";

export type PermissionProps = {
  name: string;
  description?: string;
};
export default class Permission extends Entity<PermissionProps> {
  constructor(props: PermissionProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
