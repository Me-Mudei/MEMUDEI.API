import { Module } from '@nestjs/common';

import { BcryptAdapter } from './bcrypt.adapter';
import { CryptoService } from './crypto.service';

@Module({
  providers: [
    {
      provide: CryptoService,
      useClass: BcryptAdapter,
    },
  ],
  exports: [CryptoService],
})
export class CryptoModule {}
