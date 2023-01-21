import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Config = {
  log: {
    level: string;
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
  };
}

export const configEnv = makeConfig();
