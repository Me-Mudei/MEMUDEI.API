import ValueObject from "../../../shared/domain/value-objects/value-object";

export class Cpf extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  validate() {
    this.normalize();
    this.verify(this.value);
    const first_check_digit = this.calculate_digit(this.value, 10);
    const second_check_digit = this.calculate_digit(this.value, 11);
    const verifier_digit = this.value.slice(9);
    const calculated_verified_digit = `${first_check_digit}${second_check_digit}`;
    if (verifier_digit != calculated_verified_digit) {
      throw new Error("Invalid CPF");
    }
  }

  normalize() {
    this.value.replace(/\D/g, "");
  }

  verify(cpf: string) {
    const [first_digit] = cpf;
    if (cpf.length !== 11 || [...cpf].every((c) => c === first_digit))
      throw new Error("Invalid CPF");
  }

  calculate_digit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}
