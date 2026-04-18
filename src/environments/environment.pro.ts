import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  loggerConfig: {
    level: NgxLoggerLevel.OFF,
    disableConsoleLogging: true,
  },
};
