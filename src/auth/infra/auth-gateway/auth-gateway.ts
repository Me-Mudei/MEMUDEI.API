import { verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { configEnv } from '#shared/infra';

export type Session = {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
  nonce: string;
};
export class AuthGateway {
  private getKey(header: any, callback: any) {
    const client = jwksClient({
      jwksUri: `https://${configEnv.auth.domain}/.well-known/jwks.json`,
    });
    client.getSigningKey(header.kid, function (error, key) {
      if (error || !key) callback(error, null);
      if (key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  }

  async decodeToken(token: string) {
    return new Promise<Session>((resolve, reject) => {
      verify(
        token.replace('Bearer ', ''),
        this.getKey,
        {
          audience: configEnv.auth.audience,
          issuer: `https://${configEnv.auth.domain}/`,
          algorithms: ['RS256'],
        },
        (err, decoded: Session) => {
          if (err) {
            return reject(
              new Error(`Failed to authenticate token: ${err.message}`),
            );
          }
          resolve(decoded);
        },
      );
    });
  }
}
