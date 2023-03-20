import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Config = {
  env: string;
  log: {
    level: string;
  };
  auth: {
    vendor: 'AUTH0';
    audience: string;
    issuer: string;
    domain: string;
  };
  cloud: {
    vendor: 'AWS' | 'LOCALSTACK';
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    endpoint: string;
  };
  storage: {
    vendor: 'S3';
    bucket: string;
  };
};

export function makeConfig(): Config {
  return {
    env: process.env.NODE_ENV,
    log: {
      level: process.env.LOG_LEVEL,
    },
    auth: {
      vendor: process.env.AUTH_VENDOR as any,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
      domain: process.env.AUTH_DOMAIN,
    },
    cloud: {
      vendor: process.env.CLOUD_VENDOR as any,
      accessKeyId: process.env.CLOUD_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY,
      region: process.env.CLOUD_REGION,
      endpoint: process.env.CLOUD_ENDPOINT,
    },
    storage: {
      vendor: process.env.STORAGE_VENDOR as any,
      bucket: process.env.STORAGE_BUCKET,
    },
  };
}

export const configEnv = makeConfig();
