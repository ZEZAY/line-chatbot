import { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { WebhookRequest } from '../domain/webhook';
import { LineChatbotUsecase } from './app-usecase';
import { Logger } from './plugin';

export async function LineChatbotRoute(fastify: FastifyInstance): Promise<void> {
  const lineApiUsecase = new LineChatbotUsecase();
  const logger: Logger = Container.get('Logger');

  fastify.post('/webhook', async (req: WebhookRequest, res) => {
    logger.info(`receive new webhook`);
    const response = lineApiUsecase.receiveWebhook(req);
    return response;
  });

  // TODO: add /direct-message
}
