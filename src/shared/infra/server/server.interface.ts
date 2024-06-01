import { Handler } from 'aws-lambda';

export default interface Server {
  listen(port: number): Promise<void>;
  handler(): Handler;
}
