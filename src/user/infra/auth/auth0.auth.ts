import { LoggerInterface, WinstonLogger, configEnv } from '#shared/infra';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Auth, SignupUserInput } from './auth.interface';
import { User } from '#user/domain';

type SignupInput = {
  client_id: string;
  email: string;
  password: string;
  connection: string;
  username?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  user_metadata?: {
    [key: string]: string;
  };
};

type SignupOutput = {
  _id: string;
  email_verified: boolean;
  email: string;
  username: string;
  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
};

export class Auth0Auth implements Auth {
  private logger: LoggerInterface;
  private baseUrl: string;
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create();
    this.baseUrl = `${configEnv.auth.issuer}`;
    this.logger = WinstonLogger.getInstance();
  }
  async signup(input: SignupUserInput) {
    const res = await this.httpClient.post<
      SignupOutput,
      AxiosResponse<SignupOutput>,
      SignupInput
    >(
      `${this.baseUrl}dbconnections/signup`,
      {
        client_id: configEnv.auth.client_id,
        connection: 'Username-Password-Authentication',
        email: input.email,
        password: input.password,
      },
      {
        headers: {
          content_type: 'application/json',
        },
      },
    );
    return new User({
      external_id: `auth0|${res.data._id}`,
      email: res.data.email,
      name: input.name,
    });
  }
}
