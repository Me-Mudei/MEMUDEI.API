import bcrypt from "bcryptjs";

import { Crypto } from "./crypto.interface";

export class BcryptCrypto implements Crypto {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
