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
    console.log("START:AuthGateway.getKey");
    console.log(configEnv.auth.domain);
    const client = jwksClient({
      jwksUri: `https://${configEnv.auth.domain}/.well-known/jwks.json`
    });
    console.log("client", client);
    client.getSigningKey(header.kid, function (error, key) {
      console.log("START:AuthGateway.getKey.getSigningKey");
      console.log("error", error);
      console.log("key", key);
      if (error || !key) callback(error, null);
      if (key) {
        const signingKey = key.getPublicKey();
        console.log("signingKey", signingKey);
        callback(null, signingKey);
      }
    });
  }

  async decodeToken(token: string) {
    console.log("START:AuthGateway");
    console.log(token.replace("Bearer ", ""), this.getKey, {
      audience: configEnv.auth.audience,
      issuer: `https://${configEnv.auth.domain}/`,
      algorithms: ["RS256"]
    });
    return new Promise<Session>((resolve, reject) => {
      verify(
        token.replace("Bearer ", ""),
        this.getKey,
        {
          audience: configEnv.auth.audience,
          issuer: `https://${configEnv.auth.domain}/`,
          algorithms: ["RS256"]
        },
        (err, decoded: Session) => {
          console.log("START:AuthGateway.decodeToken");
          console.log("err", err);
          console.log("decoded", decoded);
          if (err) {
            return reject(
              new Error(`Failed to authenticate token: ${err.message}`)
            );
          }
          resolve(decoded);
        }
      );
    });
  }
}
