export interface AuthGateway {
  decodeToken(token: string): Promise<any>;
}
