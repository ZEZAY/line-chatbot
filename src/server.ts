import fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DotEnvConfig, LoggerContainerKey, connectToDatabase, errorHandler, newLogger, readConfigFromDotEnv } from './core/plugin';
import { LineChatbotRoute } from './core/route';
import { MessagingService } from './domain/messaging/messaging-usecase';
import { MessagingApi } from './domain/messaging/messaging-service';
import { WebhookUsecase } from './domain/webhook/webhook-usecase';

export default async function createServer(): Promise<FastifyInstance> {
  const logger = newLogger();
  Container.set(LoggerContainerKey, logger);

  const config = readConfigFromDotEnv();
  Container.set(DotEnvConfig, config);

  await connectToDatabase(config.MONGODB_URI, config.MONGODB_DATABASE);

  const messagingService = new MessagingApi();
  Container.set(MessagingApi, messagingService);

  const messagingUsecase = new MessagingService();
  Container.set(MessagingService, messagingUsecase);

  const webhookUsecase = new WebhookUsecase();
  Container.set(WebhookUsecase, webhookUsecase);

  const server = fastify();

  server.setErrorHandler(errorHandler);

  server.get('/', async () => {
    logger.info('receive line chatbot api health check');
    return { hello: 'chatbot' };
  });

  server.register(LineChatbotRoute, { prefix: '/' });

  return server;
}
