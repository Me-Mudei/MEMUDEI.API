import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpClient {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> {
    const { data, status } = await this.axios.get<T>(url, config);
    return { data, status };
  }

  public async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> {
    const { data, status } = await this.axios.post<T>(url, body, config);
    return { data, status };
  }

  public async put<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> {
    const { data, status } = await this.axios.put<T>(url, body, config);
    return { data, status };
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<{ data: T; status: number }> {
    const { data, status } = await this.axios.delete<T>(url, config);
    return { data, status };
  }
}
