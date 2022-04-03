import { verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export default class Auth0 {
  constructor(readonly token: string) {}

  getKey(header: any, callback: any) {
    const client = jwksClient({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
    client.getSigningKey(header.kid, function (error, key) {
      if (error || !key) callback(error, null);
      if (key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  }

  async validToken() {
    return new Promise<any>((resolve, reject) => {
      verify(
        this.token,
        this.getKey,
        {
          audience: process.env.AUTH0_CLIENT_ID,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        }
      );
    });
  }
}
