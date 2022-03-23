import Permission from './Permission';

export default class Role {
  permissions: Permission[] = [];
  constructor(readonly name: string, readonly description?: string) {}

  addPermission(permission: Permission) {
    this.permissions.push(permission);
  }

  removePermission(permissionName: string) {
    const permIndex = this.permissions.find(
      (perm) => perm.name === permissionName
    );
    if (!permIndex) {
      throw new Error('Permission not found');
    }
    this.permissions.splice(this.permissions.indexOf(permIndex), 1);
  }

  hasPermission(permissionName: string) {
    return !!this.permissions.find((p) => p.name === permissionName);
  }
}
