import Address from '../../../src/domain/entity/Address';
import Cpf from '../../../src/domain/entity/Cpf';
import Permission from '../../../src/domain/entity/Permission';
import Role from '../../../src/domain/entity/Role';
import User from '../../../src/domain/entity/User';
import BrasilApiCep from '../../../src/infra/service/validate_cep/BrasilApiCep';

test('Should be able to create an User', () => {
  const user = new User(
    'John Doe',
    'jhon.doe@mail.com',
    '011923456789',
    new Date('2000-01-01'),
    'M',
    new Address(
      new BrasilApiCep(),
      'Rua dos bobos',
      '123',
      'Brasil',
      '12345678',
      'Bairro',
      'Complemento'
    ),
    new Cpf('04513038578'),
    new Role('LESSEE', 'Lessee')
  );
  expect(user.name).toBe('John Doe');
});

test('Should be able to create an User and validate zipcode', async () => {
  const address = new Address(
    new BrasilApiCep(),
    'Rua dos bobos',
    '123',
    'Brasil',
    '46900000',
    'Bairro',
    'Complemento'
  );
  await address.validateZipCode();
  const user = new User(
    'John Doe',
    'jhon.doe@mail.com',
    '011923456789',
    new Date('2000-01-01'),
    'M',
    address,
    new Cpf('04513038578'),
    new Role('LESSEE', 'Lessee')
  );
  expect(user.address.city).toBe('Seabra');
});

test('Should be able to create an User and authorization role to create-user', () => {
  const address = new Address(
    new BrasilApiCep(),
    'Rua dos bobos',
    '123',
    'Brasil',
    '46900000',
    'Bairro',
    'Complemento'
  );
  const role = new Role('LESSEE', 'Lessee');
  role.addPermission(new Permission('create-user'));
  const user = new User(
    'John Doe',
    'jhon.doe@mail.com',
    '011923456789',
    new Date('2000-01-01'),
    'M',
    address,
    new Cpf('04513038578'),
    role
  );
  expect(user.role.hasPermission('create-user')).toBeTruthy();
});
