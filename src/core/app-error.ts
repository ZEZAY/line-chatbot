import Container from 'typedi';

import { Logger } from './plugin';

export const errorHandler = (error: any, request: any, reply: any) => {
  const logger: Logger = Container.get('Logger');
  logger.error(`server error: ${error}`);
};
