import Cpf from '../../../src/domain/entity/Cpf';

test('Should validate a cpf', function () {
  const cpf = new Cpf('935.411.347-80');
  expect(cpf).toBeTruthy();
});

test('Should try to validate an invalid cpf', function () {
  expect(() => new Cpf('123.456.789-99')).toThrow(new Error('Invalid CPF'));
});

test('Should try to validate a cpf with all the same digits', function () {
  expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid CPF'));
});

test('Should try to validate a very large invalid cpf', function () {
  expect(() => new Cpf('123.456.789-1000')).toThrow(new Error('Invalid CPF'));
});

test('Should try to validate a very small invalid cpf', function () {
  expect(() => new Cpf('123.456')).toThrow(new Error('Invalid CPF'));
});
