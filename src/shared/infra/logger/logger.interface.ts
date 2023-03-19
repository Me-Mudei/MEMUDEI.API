export type ReqLoggerProps = {
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
};
export type LoggerProps = {
  svc: string;
  req: ReqLoggerProps;
};

export interface DefaultInput {
  message: string;
  meta?: any;
}

export interface ErrorInput extends DefaultInput {
  imp: string;
  err_code: string;
  err_category?: string;
  meta?: any;
}

export type levelType =
  | 'info'
  | 'debug'
  | 'error'
  | 'warn'
  | 'process'
  | 'critical';

export const logLevels = {
  info: 5,
  warn: 4,
  debug: 3,
  error: 2,
  process: 1,
  critical: 0,
};

export const logColors = {
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
  process: 'magenta',
  critical: 'bgRed',
};
export interface LoggerInterface {
  critical(input: ErrorInput): void;
  info(input: DefaultInput): void;
  error(input: ErrorInput): void;
  debug(input: DefaultInput): void;
  warn(input: DefaultInput): void;
}
