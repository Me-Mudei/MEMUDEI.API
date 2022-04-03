import { CepSuccessResponse } from './IValidateCep';

export default interface ValidateCep {
  validateByCep(cep: string): Promise<CepSuccessResponse>;
}
