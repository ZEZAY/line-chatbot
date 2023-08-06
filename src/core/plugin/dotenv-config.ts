import { IsIn, IsNotEmpty, IsPort, validate } from 'class-validator';
import pino, { Level } from 'pino';
import dotenv from 'dotenv';
import fs from 'fs';
import Container from 'typedi';

import { Logger } from './logger';

export class DotEnvConfig {
  @IsNotEmpty()
  readonly CHATBOT_API_HOST: string = 'localhost';

  @IsPort()
  readonly CHATBOT_API_PORT: number = 8080;

  @IsIn(Object.values(pino.levels.labels))
  readonly LOG_LEVEL: Level = 'info';

  [x: string]: any;

  constructor() {
    for (const key of Object.keys(this)) {
      this[key] = process.env[key];
    }
  }
}

export function readConfigFromDotEnv(): DotEnvConfig {
  const logger: Logger = Container.get('Logger');
  const dotenvPath = fs.existsSync('.env') ? '.env' : 'common/config/.env.local';
  logger.info(`readConfigFromDotEnv .env path=${dotenvPath}`);
  dotenv.config({ path: dotenvPath });
  const config = new DotEnvConfig();

  validate(config).then(errors => {
    if (errors.length > 0) {
      logger.error(`readConfigFromDotEnv validation failed. Errors: ${errors}`);
      process.exit(1);
    }
    logger.info('readConfigFromDotEnv validation success.');
  });

  logger.debug(config);
  return config;
}
