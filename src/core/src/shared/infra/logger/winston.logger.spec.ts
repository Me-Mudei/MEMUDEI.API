import path from 'path';
import { LoggerInterface, LoggerProps } from './logger.interface';
import { WinstonLoggerAdapter } from './winston.logger';

describe('WinstonLogger Unit Tests', () => {
  let winston: LoggerInterface;
  let winstonProps: LoggerProps;
  beforeEach(() => {
    winstonProps = {
      app: 'testApp',
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    };
    winston = new WinstonLoggerAdapter(winstonProps);
  });
  it('should accept a required logger props passed in constructor', () => {
    const loggerProps = {
      app: 'testApp',
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    };
    const logger = new WinstonLoggerAdapter(loggerProps);
    expect(logger.app).toStrictEqual(loggerProps.app);
    expect(logger.svc).toStrictEqual(loggerProps.svc);
    expect(logger.req_id).toStrictEqual(loggerProps.req.req_id);
    expect(logger.req_method).toStrictEqual(loggerProps.req.req_method);
    expect(logger.req_path).toStrictEqual(loggerProps.req.req_path);
    expect(logger.req_ua).toStrictEqual(loggerProps.req.req_ua);
  });

  it('should logger sucess all levels', () => {
    const infoLoggerProps = { message: 'info log', res_st_code: 200 };
    winston.info(infoLoggerProps);
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:43:13)`,
    );
    expect(winston.message).toStrictEqual(infoLoggerProps.message);
    expect(winston.res_st_code).toStrictEqual(infoLoggerProps.res_st_code);

    const warnLoggerProps = { message: 'warn log', res_st_code: 300 };
    winston.warn(warnLoggerProps);
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:51:13)`,
    );
    expect(winston.message).toStrictEqual(warnLoggerProps.message);
    expect(winston.res_st_code).toStrictEqual(warnLoggerProps.res_st_code);

    const debugLoggerProps = { message: 'debug log', res_st_code: 300 };
    winston.debug(debugLoggerProps);
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:59:13)`,
    );
    expect(winston.message).toStrictEqual(debugLoggerProps.message);
    expect(winston.res_st_code).toStrictEqual(debugLoggerProps.res_st_code);

    const errorLoggerProps = {
      message: 'error log',
      res_st_code: 400,
      imp: 'create a error log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR',
    };
    winston.error(errorLoggerProps);
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:73:13)`,
    );
    expect(winston.message).toStrictEqual(errorLoggerProps.message);
    expect(winston.res_st_code).toStrictEqual(errorLoggerProps.res_st_code);

    const criticalLoggerProps = {
      message: 'critical log',
      res_st_code: 400,
      imp: 'create a critical log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR',
    };
    winston.critical(criticalLoggerProps);
    expect(winston.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:87:13)`,
    );
    expect(winston.message).toStrictEqual(criticalLoggerProps.message);
    expect(winston.res_st_code).toStrictEqual(criticalLoggerProps.res_st_code);
  });
});
