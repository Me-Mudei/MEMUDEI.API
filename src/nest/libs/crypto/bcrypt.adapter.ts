import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { CryptoService } from './crypto.service';

@Injectable()
export class BcryptAdapter extends CryptoService {
  public compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  public async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}
