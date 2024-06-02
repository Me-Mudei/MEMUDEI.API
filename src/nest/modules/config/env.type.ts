export type EnvironmentVariables = {
  CACHE_VENDOR: "memory" | "redis";
  PRISMA_VENDOR: "memory" | "prisma";
  MAIL_VENDOR: "console" | "sendgrid";
  SMS_VENDOR: "console";
  STORAGE_ACCESS_KEY_ID: string;
  STORAGE_SECRET_ACCESS_KEY: string;
  STORAGE_REGION: string;
  STORAGE_BUCKET_NAME: string;
  DATABASE_URL: string;
  AUTH_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_NAME: string;
  SENDGRID_API_KEY: string;
  MEMUDEI_URL: string;
  MEMUDEI_MEDIA_URL: string;
};
