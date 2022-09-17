export default class Cpf {
  value: string;
  constructor(value: string | undefined) {
    if (!value || !this.validate(value)) {
      throw new Error('Invalid CPF');
    }
    this.value = this.normalizeCpf(value);
  }

  validate(rawCpf: string) {
    const cpf = this.normalizeCpf(rawCpf);
    if (!this.verifyCpf(cpf)) return false;
    const firstCheckDigit = this.calculateDigit(cpf, 10);
    const secondCheckDigit = this.calculateDigit(cpf, 11);
    const verifierDigit = cpf.slice(9);
    const calculatedVerifiedDigit = `${firstCheckDigit}${secondCheckDigit}`;
    return verifierDigit == calculatedVerifiedDigit;
  }

  normalizeCpf(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  verifyCpf(cpf: string) {
    const [firstDigit] = cpf;
    if (cpf.length !== 11 || [...cpf].every((c) => c === firstDigit))
      return false;
    return true;
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }
}
