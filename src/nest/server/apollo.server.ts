import { Handler } from 'aws-lambda';
import Server from '../../shared/infra/server/server.interface';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import serverlessExpress from '@codegenie/serverless-express';

import { AppModule } from '../app.module';
import { ValidationPipe } from '../libs/pipe/validation-pipe';

export default class ApolloServer implements Server {
  handle: Handler;

  async server() {
    const app = await NestFactory.create(AppModule);
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new ValidationPipe());
    return app;
  }

  async listen(port: number) {
    const app = await this.server();
    await app.listen(port);
  }

  handler(): Handler {
    return async (event, context, callback) => {
      if (!this.handle) {
        const app = await this.server();
        await app.init();
        const expressApp = app.getHttpAdapter().getInstance();
        this.handle = serverlessExpress({ app: expressApp });
      }
      return this.handle(event, context, callback);
    };
  }
}
