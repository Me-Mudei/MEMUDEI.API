//Instance Winston
import {
  DefaultInput,
  ErrorInput,
  LoggerInterface,
  logLevels,
  LoggerProps,
  logColors,
} from './logger.interface';
import { createLogger, format, addColors, transports, Logger } from 'winston';
import { nanoid } from 'nanoid';
import { configEnv } from '../config';

export class WinstonLogger implements LoggerInterface {
  private static instance: WinstonLogger;
  private logger: Logger;
  svc: string;
  req_id: string;
  req_path: string;
  req_method: string;
  req_ua: string;
  caller?: string;
  message?: string;
  res_st_code?: number;
  imp?: string;
  err_code?: string;
  err_category?: string;

  constructor(readonly props: LoggerProps) {
    this.svc = props.svc;
    this.req_id = props.req.req_id;
    this.req_path = props.req.req_path;
    this.req_method = props.req.req_method;
    this.req_ua = props.req.req_ua;

    addColors(logColors);
    this.logger = createLogger({
      levels: logLevels,
      defaultMeta: {
        svc: this.svc,
        req_id: this.req_id,
        req_path: this.req_path,
        req_method: this.req_method,
        req_ua: this.req_ua,
      },
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf((info) => {
          const { timestamp, level, ...args } = info;

          const ts = timestamp.slice(0, 19).replace('T', ' ');
          return `${ts} [${level}]: ${
            Object.keys(args).length ? JSON.stringify(args) : ''
          }`;
        }),
      ),
      transports: [new transports.Console({ level: configEnv.log.level })],
    });
    WinstonLogger.instance = this;
  }

  static getInstance() {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger({
        req: {
          req_id: nanoid(),
          req_method: 'DIRECT',
          req_path: 'DIRECT',
          req_ua: 'TEST',
        },
        svc: 'TEST',
      });
    }
    return WinstonLogger.instance;
  }

  private setCaller() {
    const err = new Error();
    const caller_line = err.stack.split('\n')[3];
    this.caller = caller_line.split(' ')[6];
  }

  info(input: DefaultInput) {
    this.setCaller();
    this.message = input.message;
    this.logger.info({ ...input, caller: this.caller });
  }

  warn(input: DefaultInput) {
    this.setCaller();
    this.message = input.message;
    this.logger.warn({ ...input, caller: this.caller });
  }

  error(input: ErrorInput) {
    this.setCaller();
    this.message = input.message;
    this.imp = input.imp;
    this.err_code = input.err_code;
    this.err_category = input.err_category;
    this.logger.error({ ...input, caller: this.caller });
  }

  debug(input: DefaultInput) {
    this.setCaller();
    this.message = input.message;
    this.logger.debug({ ...input, caller: this.caller });
  }

  critical(input: ErrorInput) {
    this.setCaller();
    this.message = input.message;
    this.imp = input.imp;
    this.err_code = input.err_code;
    this.err_category = input.err_category;
    this.logger.log({
      level: 'critical',
      ...input,
      caller: this.caller,
    });
  }
}
