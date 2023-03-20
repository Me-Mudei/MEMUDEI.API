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
  console.log('process.env', process.env);
  console.log(join(__dirname, '../../../../.env.development'));
  const output = readEnv({
    path:
      !process.env?.NODE_ENV || process.env.NODE_ENV === 'local'
        ? join(__dirname, '../../../../.env')
        : join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
  });

  return {
    env: output.parsed.NODE_ENV,
    log: {
      level: output.parsed.LOG_LEVEL,
    },
    auth: {
      vendor: output.parsed.AUTH_VENDOR as any,
      audience: output.parsed.AUTH_AUDIENCE,
      issuer: output.parsed.AUTH_ISSUER,
      domain: output.parsed.AUTH_DOMAIN,
    },
    cloud: {
      vendor: output.parsed.CLOUD_VENDOR as any,
      accessKeyId: output.parsed.CLOUD_ACCESS_KEY_ID,
      secretAccessKey: output.parsed.CLOUD_SECRET_ACCESS_KEY,
      region: output.parsed.CLOUD_REGION,
      endpoint: output.parsed.CLOUD_ENDPOINT,
    },
    storage: {
      vendor: output.parsed.STORAGE_VENDOR as any,
      bucket: output.parsed.STORAGE_BUCKET,
    },
  };
}

export const configEnv = makeConfig();
