import { LoggerProps } from './logger.interface';
import { WinstonLogger } from './winston.logger';

describe('WinstonLogger Unit Tests', () => {
  let winstonProps: LoggerProps;
  let logger: WinstonLogger;

  beforeEach(() => {
    winstonProps = {
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    };
    logger = new WinstonLogger(winstonProps);
  });
  it('should accept a required logger props passed in constructor', () => {
    const loggerProps = {
      svc: 'testSvc',
      req: {
        req_id: 'test',
        req_path: 'test',
        req_method: 'test',
        req_ua: 'test',
      },
    };
    expect(logger.svc).toStrictEqual(loggerProps.svc);
    expect(logger.req_id).toStrictEqual(loggerProps.req.req_id);
    expect(logger.req_method).toStrictEqual(loggerProps.req.req_method);
    expect(logger.req_path).toStrictEqual(loggerProps.req.req_path);
    expect(logger.req_ua).toStrictEqual(loggerProps.req.req_ua);
  });

  it('should logger sucess all levels', () => {
    const infoLoggerProps = { message: 'info log' };
    logger.info(infoLoggerProps);

    expect(logger.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:39:12)`,
    );
    expect(logger.message).toStrictEqual(infoLoggerProps.message);
    const warnLoggerProps = { message: 'warn log' };
    logger.warn(warnLoggerProps);
    expect(logger.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:46:12)`,
    );
    expect(logger.message).toStrictEqual(warnLoggerProps.message);

    const debugLoggerProps = { message: 'debug log' };
    logger.debug(debugLoggerProps);
    expect(logger.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:53:12)`,
    );
    expect(logger.message).toStrictEqual(debugLoggerProps.message);

    const errorLoggerProps = {
      message: 'error log',
      imp: 'create a error log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR',
    };
    logger.error(errorLoggerProps);
    expect(logger.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:65:12)`,
    );
    expect(logger.message).toStrictEqual(errorLoggerProps.message);

    const criticalLoggerProps = {
      message: 'critical log',
      imp: 'create a critical log',
      err_code: 'ERROR_LOG',
      err_category: 'ERROR',
    };
    logger.critical(criticalLoggerProps);
    expect(logger.caller).toStrictEqual(
      `(${__dirname}/winston.logger.spec.ts:77:12)`,
    );
    expect(logger.message).toStrictEqual(criticalLoggerProps.message);
  });
});
