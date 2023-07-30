import { configEnv } from "#shared/infra";
import { verify } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export type Session = {
  iss: string;
  aud: string[];
  sub: string;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
};
export class AuthGateway {
  private getKey(header: any, callback: any) {
    const client = jwksClient({
      jwksUri: `https://${configEnv.auth.domain}/.well-known/jwks.json`
    });
    client.getSigningKey(header.kid, function (error, key) {
      if (error || !key) callback(error, null);
      if (key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  }

  decodeToken(token: string, callback?: (err: any, decoded?: Session) => void) {
    verify(
      token.replace("Bearer ", ""),
      this.getKey,
      {
        audience: configEnv.auth.audience,
        issuer: `https://${configEnv.auth.domain}/`,
        algorithms: ["RS256"]
      },
      callback
    );
  }
}
