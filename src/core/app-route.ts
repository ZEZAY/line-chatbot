import { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DirectMessagePayload, DirectMessagePayloadSchema } from '../domain/messaging/messaging-dto';
import { WebhookRequest } from '../domain/webhook/webhook-dto';
import { LineChatbotUsecase } from './app-usecase';
import { LoggerContainerKey } from './plugin';

export async function LineChatbotRoute(fastify: FastifyInstance): Promise<void> {
  const lineChatbotUsecase = new LineChatbotUsecase();
  const logger = Container.get(LoggerContainerKey);

  fastify.post('/webhook', async (req: WebhookRequest, res) => {
    logger.info(`receive new webhook`);
    const response = lineChatbotUsecase.receiveWebhook(req);
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
      const response = lineChatbotUsecase.sendMessageToUser(messagePayload);
      return response;
    },
  );
}
