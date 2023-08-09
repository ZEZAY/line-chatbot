import fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DotEnvConfig, LoggerContainerKey, connectToDatabase, errorHandler, newLogger, readConfigFromDotEnv } from './core/plugin';
import { LineChatbotRoute } from './core/route';
import { Messenger } from './domain/messaging/messaging-service';
import { WebhookUsecase } from './domain/webhook/webhook-usecase';
import { AccessTokenRepository } from './domain/access-token/access-token-repository';
import { AccessTokenRecordContainerKey } from './domain/access-token/access-token-dto';

export default async function createServer(): Promise<FastifyInstance> {
  const logger = newLogger();
  Container.set(LoggerContainerKey, logger);

  const config = readConfigFromDotEnv();
  Container.set(DotEnvConfig, config);

  await connectToDatabase(config.MONGODB_URI, config.MONGODB_DATABASE, config.MONGODB_COLLECTION);
  const accessTokenRepository = new AccessTokenRepository();
  const accessToken = await accessTokenRepository.getAccessToken(config.CHANNEL_ID);
  Container.set(AccessTokenRecordContainerKey, accessToken);

  const messenger = new Messenger();
  Container.set(Messenger, messenger);

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
