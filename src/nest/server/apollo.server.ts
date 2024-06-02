import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';

import { AppModule } from '../app.module';
import { ValidationPipe } from '#nest/shared/pipe/validation-pipe';

export default class ApolloServer {
  handle: Handler;

  async server() {
    const app = await NestFactory.create(AppModule);
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
