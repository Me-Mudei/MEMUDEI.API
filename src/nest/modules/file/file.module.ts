import { Module } from '@nestjs/common';
import { BucketModule } from '../../libs/bucket/bucket.module';
import { PrismaModule } from '../../libs/prisma/prisma.module';

import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [PrismaModule, BucketModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
