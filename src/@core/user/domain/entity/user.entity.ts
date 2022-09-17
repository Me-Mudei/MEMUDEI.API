import Address from "./address.entity";
import Cpf from "./cpf.value-object";

export default class User {
  disabledAt?: string;
  deletedAt?: string;
  born?: string;
  cpf?: string;

  constructor(
    readonly email: string,
    readonly name: string,
    readonly roleName: string,
    readonly phone?: string,
    born?: Date,
    readonly address?: Address,
    cpf?: string,
    readonly description?: string | null
  ) {
    this.born = born?.toISOString();
    if (!!cpf) this.cpf = new Cpf(cpf).value;
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
}
