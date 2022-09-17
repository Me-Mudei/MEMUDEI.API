import Address from '../../../src/domain/entity/Address';
import User from '../../../src/domain/entity/User';
import BrasilApiValidateCepAdapter from '../../../src/infra/validate_cep/BrasilApiValidateCepAdapter';

test('Should be able to create an User', () => {
  const user = new User(
    'jhon.doe@mail.com',
    'John Doe',
    'LESSEE',
    '011923456789',
    new Date('2000-01-01'),
    new Address(
      new BrasilApiValidateCepAdapter(),
      'Rua dos bobos',
      '123',
      'Brasil',
      '12345678',
      'Bairro',
      'Complemento'
    ),
    '04513038578',
    '123456'
  );
  expect(user.name).toBe('John Doe');
});

test('Should be able to create an User and validate zipCode', async () => {
  const address = new Address(
    new BrasilApiValidateCepAdapter(),
    'Rua dos bobos',
    '123',
    'Brasil',
    '46900000',
    'Bairro',
    'Complemento'
  );
  await address.validateZipCode();
  const user = new User(
    'jhon.doe@mail.com',
    'John Doe',
    'LESSEE',
    '011923456789',
    new Date('2000-01-01'),
    address,
    '04513038578',
    '123456'
  );
  expect(user.address?.city).toBe('Seabra');
});
