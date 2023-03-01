import { verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { configEnv } from '#shared/infra';

export class AuthGateway {
  private getKey(header: any, callback: any) {
    const client = jwksClient({
      jwksUri: `${configEnv.auth.domain}/.well-known/jwks.json`,
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
    const res = await new Promise<any>((resolve, reject) => {
      verify(
        token,
        this.getKey,
        {
          audience: configEnv.auth.audience,
          issuer: configEnv.auth.issuer,
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) {
            return reject(
              new Error(`Failed to authenticate token: ${err.message}`),
            );
          }
          resolve(decoded);
        },
      );
    });
    return res;
  }
}
