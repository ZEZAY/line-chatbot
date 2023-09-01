import Container from 'typedi';
import { Logger, LoggerContainerKey, newLogger } from './src/core/plugin';

// const logger = {
//   info: jest.fn(),
//   debug: jest.fn(),
//   error: jest.fn(),
// };
const logger = newLogger('debug', 'test');
Container.set(LoggerContainerKey, logger);
