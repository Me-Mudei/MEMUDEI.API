import Address from '../../../src/domain/entity/Address';
import BrasilApiValidateCepAdapter from '../../../src/infra/validate_cep/BrasilApiValidateCepAdapter';

test('Should be able to create an Address', () => {
  const address = new Address(
    new BrasilApiValidateCepAdapter(),
    'Rua dos bobos',
    '123',
    'Brasil',
    '12345678',
    'Bairro',
    'Complemento'
  );
  expect(address.street).toBe('Rua dos bobos');
  expect(address.number).toBe('123');
  expect(address.country).toBe('Brasil');
  expect(address.zipCode).toBe('12345678');
  expect(address.neighborhood).toBe('Bairro');
  expect(address.complement).toBe('Complemento');
});

test('Should be able to create an Address and validate zipCode', async () => {
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
  expect(address.city).toBe('Seabra');
  expect(address.state).toBe('BA');
  expect(address.location).toMatchObject({
    longitude: '-41.772051',
    latitude: '-12.4172071',
  });
});
