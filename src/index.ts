import fastify from 'fastify';
import Container from 'typedi';

import { newLogger, readConfigFromDotEnv } from './core/plugin';
import { LineChatbotRoute } from './core/app-route';
import { Messenger } from './domain/messaging';
import { WebhookController, WebhookUsecase } from './domain/webhook';

const logger = newLogger();
Container.set('Logger', logger);

const config = readConfigFromDotEnv();
Container.set('DotEnvConfig', config);

const messenger = new Messenger();
Container.set('Messenger', messenger);

const webhookUsecase = new WebhookUsecase();
const webhookController = new WebhookController(webhookUsecase);
Container.set('WebhookController', webhookController);

const server = fastify({
  // disableRequestLogging: true,
  // logger: true,
});

// TODO: reformat error
const errorHandler = (error: any, request: any, reply: any) => {
  logger.error(`server error: ${error}`);
};
server.setErrorHandler(errorHandler);

// TODO: check
// server.addHook('preHandler', async (request, reply) => {
// });

server.get('/', async () => {
  logger.info('receive line chatbot api health check');
  return { hello: 'chatbot' };
});

server.register(LineChatbotRoute, { prefix: '/' });

server.listen({ port: config.CHATBOT_API_PORT, host: config.CHATBOT_API_HOST }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
