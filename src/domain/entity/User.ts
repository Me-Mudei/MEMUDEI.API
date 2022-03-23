import Address from './Address';
import Cpf from './Cpf';

export default class User {
  disabledAt?: string;
  deletedAt?: string;
  emailIsConfirmed: boolean;
  password: string;
  born: string;
  cpf: string;

  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    born: Date,
    readonly gender: 'M' | 'F',
    readonly address: Address,
    cpf: string,
    readonly roleName: string,
    password: string,
    readonly externalId?: string,
    readonly description?: string | null
  ) {
    this.emailIsConfirmed = false;
    this.password = this.encryptPassword(password);
    this.born = born.toISOString();
    this.cpf = new Cpf(cpf).value;
  }

  deleteUser() {
    this.deletedAt = new Date().toISOString();
  }

  disableUser() {
    this.disabledAt = new Date().toISOString();
  }

  encryptPassword(password: string) {
    return password;
  }

  confirmEmail() {
    this.emailIsConfirmed = true;
  }
}
