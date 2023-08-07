import fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { newLogger, readConfigFromDotEnv } from './core/plugin';
import { LineChatbotRoute } from './core/app-route';
import { errorHandler } from './core/app-error';
import { Messenger } from './domain/messaging';
import { WebhookUsecase } from './domain/webhook';

export default function createServer(): FastifyInstance {
  const logger = newLogger();
  Container.set('Logger', logger);

  const config = readConfigFromDotEnv();
  Container.set('DotEnvConfig', config);

  const messenger = new Messenger();
  Container.set('Messenger', messenger);

  const webhookUsecase = new WebhookUsecase();
  Container.set('WebhookUsecase', webhookUsecase);

  const server = fastify();

  server.setErrorHandler(errorHandler);

  server.get('/', async () => {
    logger.info('receive line chatbot api health check');
    return { hello: 'chatbot' };
  });

  server.register(LineChatbotRoute, { prefix: '/' });

  return server;
}
