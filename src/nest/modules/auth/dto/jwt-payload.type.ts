export class JwtPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  roles: string[];
}
