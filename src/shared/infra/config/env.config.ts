type Config = {
  env: string;
  database: {
    url: string;
  };
  log: {
    level: string;
  };
  auth: {
    vendor: "AUTH0";
    audience: string;
    issuer: string;
    domain: string;
    client_id: string;
  };
  crm: {
    vendor: "HUBSPOT";
    accessToken: string;
  };
};

export function makeConfig(): Config {
  return {
    env: process.env.NODE_ENV,
    database: {
      url: process.env.DATABASE_URL
    },
    log: {
      level: process.env.LOG_LEVEL
    },
    auth: {
      vendor: process.env.AUTH_VENDOR as any,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
      domain: process.env.AUTH_DOMAIN,
      client_id: process.env.AUTH_CLIENT_ID
    },
    crm: {
      vendor: process.env.CRM_VENDOR as any,
      accessToken: process.env.CRM_ACCESS_TOKEN
    }
  };
}

export const configEnv = makeConfig();
