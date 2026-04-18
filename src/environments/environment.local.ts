import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  loggerConfig: {
    level: NgxLoggerLevel.TRACE,
    disableConsoleLogging: false,
  },
};
