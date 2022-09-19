import Entity from "../../../@shared/domain/entity/entity";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Permission from "./permission.entity";

export type RoleProps = {
  name: string;
  permissions: Permission[];
  description?: string;
};

export default class Role extends Entity<RoleProps> {
  constructor(props: RoleProps, id?: UniqueEntityId) {
    super(props, id);
    this.props.permissions = [];
  }

  add_permission(permission: Permission) {
    this.props.permissions.push(permission);
  }

  remove_permission(permission: string) {
    const perm_index = this.props.permissions.find(
      (perm) => perm.props.name === permission
    );
    if (!perm_index) {
      throw new Error("Permission not found");
    }
    this.props.permissions.splice(
      this.props.permissions.indexOf(perm_index),
      1
    );
  }

  has_permission(permission: string) {
    return !!this.props.permissions.find(
      (perm) => perm.props.name === permission
    );
  }
}
