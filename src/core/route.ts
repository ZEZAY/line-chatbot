import { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DirectMessagePayload, DirectMessagePayloadSchema } from '../domain/messaging/messaging-dto';
import { MessagingUsecase } from '../domain/messaging/messaging-usecase';
import { WebhookEvent, WebhookRequest } from '../domain/webhook/webhook-dto';
import { WebhookUsecase } from '../domain/webhook/webhook-usecase';
import { LoggerContainerKey } from './plugin';

export async function LineChatbotRoute(fastify: FastifyInstance): Promise<void> {
  const messagingUsecase = Container.get(MessagingUsecase);
  const webhookUsecase = Container.get(WebhookUsecase);
  const logger = Container.get(LoggerContainerKey);

  fastify.post('/webhook/:channelId', async (req: WebhookRequest, res) => {
    logger.info(`receive new webhook`);
    const events: WebhookEvent[] = req.body.events || [];
    const channelId = req.params.channelId;
    await events.map(event =>
      webhookUsecase.handleWebhookEvent(event, channelId).catch(err => {
        logger.error(`handle webhook failed, ${err}`);
        return res.status(500).send({ isError: true, msg: err.message });
      }),
    );
    return res.status(200).send({ isError: false, msg: 'handle webhook success' });
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
      const messagePayload: DirectMessagePayload = req.body;
      await messagingUsecase.sendDirectMessageWithPayload(messagePayload).catch(err => {
        logger.error(`send direct message failed, ${err}`);
        return res.status(500).send({ isError: true, msg: err.message });
      });
      return res.status(200).send({ isError: false, msg: 'send direct message success' });
    },
  );
}
