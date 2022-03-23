import Address from './Address';
import Cpf from './Cpf';
import Permission from './Permission';
import Role from './Role';

export default class User {
  createdAt: string;
  updatedAt: string;
  disabledAt?: string;
  deletedAt?: string;
  emailIsConfirmed: boolean;
  password?: string;
  born: string;

  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    born: Date,
    readonly gender: 'M' | 'F',
    readonly address: Address,
    readonly cpf: Cpf,
    readonly role: Role,
    readonly externalId?: string,
    password?: string,
    readonly description?: string
  ) {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.emailIsConfirmed = false;
    this.password = this.encryptPassword(password);
    this.born = born.toISOString();
  }

  deleteUser() {
    this.deletedAt = new Date().toISOString();
  }

  disableUser() {
    this.disabledAt = new Date().toISOString();
  }

  encryptPassword(password?: string) {
    return password;
  }

  confirmEmail() {
    this.emailIsConfirmed = true;
  }
}
