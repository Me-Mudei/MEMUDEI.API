export type LoggerProps = { app: string; svc: string; req: any };

export interface DefaultInput {
  message: string;
  res_st_code: number;
}

export interface ErrorInput extends DefaultInput {
  imp: string;
  err_code: string;
  err_category: string;
}

export type levelType =
  | 'info'
  | 'debug'
  | 'error'
  | 'warn'
  | 'process'
  | 'critical';

export const logLevels = {
  info: 0,
  warn: 1,
  debug: 3,
  error: 4,
  process: 5,
  critical: 6,
};
export interface LoggerInterface {
  app: string;
  svc: string;
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  ts: Date;
  caller?: string;
  message?: string;
  res_st_code?: number;
  imp?: string;
  err_code?: string;
  err_category?: string;
  critical(input: ErrorInput): void;
  info(input: DefaultInput): void;
  error(input: ErrorInput): void;
  debug(input: DefaultInput): void;
  warn(input: DefaultInput): void;
}
