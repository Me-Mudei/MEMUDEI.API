import Permission from '../../../src/domain/entity/Permission';
import Role from '../../../src/domain/entity/Role';

test('Should be able to create an Role', () => {
  const role = new Role('admin', 'Administrator');
  expect(role.name).toBe('admin');
  expect(role.description).toBe('Administrator');
});

test('Should be able to add a permission', () => {
  const role = new Role('admin', 'Administrator');
  role.addPermission(new Permission('read-user'));
  expect(role.permissions).toHaveLength(1);
});

test('Should be able to remove a permission', () => {
  const role = new Role('admin', 'Administrator');
  role.addPermission(new Permission('read-user'));
  role.removePermission('read-user');
  expect(role.permissions).toHaveLength(0);
});

test('Should be able to check if has a permission', () => {
  const role = new Role('admin', 'Administrator');
  role.addPermission(new Permission('read-user'));
  expect(role.hasPermission('read-user')).toBeTruthy();
});
