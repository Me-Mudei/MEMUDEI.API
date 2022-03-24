import axios from 'axios';
import HttpClient from '../http_client/HttpClient.';
import { CepSuccessResponse } from './IValidateCep';
import ValidateCep from './ValidateCep';

export default class BrasilApiValidateCepAdapter implements ValidateCep {
  readonly httpClient = new HttpClient(
    axios.create({
      timeout: 1000 * 15,
    })
  );
  constructor() {}

  async validateByCep(cep: string): Promise<CepSuccessResponse> {
    try {
      const response = await this.httpClient.get<CepSuccessResponse>(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
      );
      return response.data as CepSuccessResponse;
    } catch (error) {
      throw error;
    }
  }
}
