import { validate } from 'class-validator';
import dotenv from 'dotenv';
import fs from 'fs';
// import Container from "typedi";

export class EnvConfig {
  // TODO: add config

  [x: string]: any;

  constructor() {
    for (const key of Object.keys(this)) {
      this[key] = process.env[key];
    }
  }
}

export function readConfigFromDotEnv(): EnvConfig {
  // const logger: Logger = Container.get(LoggerContainerKey);
  const dotenvPath = fs.existsSync('.env') ? '.env' : 'common/config/.env.local';
  // logger.info(`readConfigFromDotEnv .env path=${dotenvPath}`);
  dotenv.config({ path: dotenvPath });
  const config = new EnvConfig();

  validate(config).then(errors => {
    if (errors.length > 0) {
      // logger.error(`readConfigFromDotEnv validation failed. Errors: ${errors}`);
      console.log(`readConfigFromDotEnv validation failed. Errors: ${errors}`);
      process.exit(1);
    }
    // logger.info("readConfigFromDotEnv validation success.");
  });

  // logger.debug(config);
  return config;
}
