import Container from 'typedi';

import {LoggerContainerKey } from '.';

export const errorHandler = (error: any, request: any, reply: any) => {
  const logger = Container.get(LoggerContainerKey);
  logger.error(`server error: ${error}`);
};
