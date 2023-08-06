import os from 'os';
import pino, { Level, Logger as PinoLogger } from 'pino';

export type Logger = PinoLogger;

export function newLogger(level: Level = 'info', service = 'line-chatbot-api'): Logger {
  let requestId = 0;
  return pino(
    {
      level,
      timestamp: pino.stdTimeFunctions.isoTime,
      base: {
        pid: process.pid,
        hostname: os.hostname(),
        service,
      },
      errorKey: 'error',
      formatters: {
        level: label => {
          return { level: label };
        },
      },
      mixin() {
        return { requestId: ++requestId };
      },
    },
    pino.destination(1),
  );
}
