import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Config = {
  log: {
    level: string;
  };
  auth: {
    audience: string;
    issuer: string;
    domain: string;
  };
};

export function makeConfig(envFile?: string): Config {
  const envByNodeEnv = {
    [process.env.NODE_ENV]: join(
      __dirname,
      `../../../../envs/.env.${process.env.NODE_ENV}`,
    ),
    default: join(__dirname, `../../../../envs/.env`),
  };

  const output = readEnv({
    path: envFile || envByNodeEnv[process.env.NODE_ENV || 'default'],
  });

  return {
    log: {
      level: output.parsed.LOG_LEVEL,
    },
    auth: {
      audience: output.parsed.AUTH_AUDIENCE,
      issuer: output.parsed.AUTH_ISSUER,
      domain: output.parsed.AUTH_DOMAIN,
    },
  };
}

export const configEnv = makeConfig();
