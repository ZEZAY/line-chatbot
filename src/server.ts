import fastify, { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DotEnvConfig, LoggerContainerKey, newLogger, readConfigFromDotEnv } from './core/plugin';
import { LineChatbotRoute } from './core/app-route';
import { errorHandler } from './core/app-error';
import { Messenger } from './domain/messaging';
import { WebhookUsecase } from './domain/webhook';
import { MongoDBUsecase, connectToDatabase } from './domain/mongodb';

export default async function createServer(): Promise<FastifyInstance> {
  const logger = newLogger();
  Container.set(LoggerContainerKey, logger);

  const config = readConfigFromDotEnv();
  Container.set(DotEnvConfig, config);

  await connectToDatabase(config.MONGODB_URI, config.MONGODB_DATABASE, config.MONGODB_COLLECTION);
  const mongoDBUsecase = new MongoDBUsecase();
  const channelAccessToken = await mongoDBUsecase.getAccessToken(config.CHANNEL_ID);
  Container.set('ChannelAccessToken', channelAccessToken);

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
