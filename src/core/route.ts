import { FastifyInstance } from 'fastify';
import Container from 'typedi';

import { DirectMessagePayload, DirectMessagePayloadSchema } from '../domain/messaging/messaging-dto';
import { MessagingService } from '../domain/messaging/messaging-usecase';
import { WebhookEvent, WebhookRequest } from '../domain/webhook/webhook-dto';
import { WebhookUsecase } from '../domain/webhook/webhook-usecase';
import { LoggerContainerKey } from './plugin';

export async function LineChatbotRoute(fastify: FastifyInstance): Promise<void> {
  const messagingUsecase = Container.get(MessagingService);
  const webhookUsecase = Container.get(WebhookUsecase);
  const logger = Container.get(LoggerContainerKey);

  fastify.post('/webhook/:channelId', async (req: WebhookRequest, res) => {
    logger.info(`receive new webhook`);
    const events: WebhookEvent[] = req.body.events || [];
    const channelId = req.params.channelId;

    // * if one fails, the others still be run
    const responses = events.map(event =>
      webhookUsecase
        .handleWebhookEvent(event, channelId)
        .then(() => {
          return res.status(200).send({ isError: false, msg: 'handle webhook success' });
        })
        .catch(error => {
          logger.error(`handle webhook failed, ${error}`);
          return res.status(500).send({ isError: true, msg: error.message });
        }),
    );
    await Promise.all(responses);
    return responses;

    // * if one fails, the others (later) fail
    // events.forEach(event => {
    //   try {
    //     webhookUsecase.handleWebhookEvent(event, channelId);
    //   } catch (error) {
    //     throw new Error(`handle webhook failed, ${error}`);
    //   }
    // });
    // return res.status(200).send({ isError: false, msg: 'handle webhook success' });
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
      try {
        await messagingUsecase.sendDirectMessageWithPayload(messagePayload);
      } catch (error) {
        logger.error(`send direct message failed, ${error}`);
      }
      return res.status(200).send({ isError: false, msg: 'send direct message success' });
    },
  );
}
