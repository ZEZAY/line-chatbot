import { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DirectMessagePayload, DirectMessagePayloadSchema } from '../domain/messaging/messaging-dto';
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

  fastify.post<{ Body: DirectMessagePayload }>(
    '/direct-message',
    {
      schema: {
        body: DirectMessagePayloadSchema,
      },
    },
    async (req, res) => {
      logger.info(`send a direct message`);
      const messagePayload = req.body;
      const response = lineApiUsecase.sendMessageToUser(messagePayload);
      return response;
    },
  );
}
