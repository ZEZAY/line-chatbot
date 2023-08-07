import { Container } from 'typedi';

import { Logger } from '../../core/plugin/logger';
import { ReplyPayload, Messenger } from '../../domain/messaging';
import { WebhookEvent, WebhookEventType } from './webhook-dto';

export class WebhookUsecase {
  async handleWebhookEvent(
    event: WebhookEvent,
    logger: Logger = Container.get('Logger'),
    messenger: Messenger = Container.get('Messenger'),
  ): Promise<void> {
    switch (event.type) {
      case WebhookEventType.message:
        this.handlerMessageEvent(event, logger, messenger);
        break;

      case WebhookEventType.follow:
        this.handlerFollowEvent(event, logger, messenger);
        break;

      default:
        break;
    }
  }

  private handlerMessageEvent(event: WebhookEvent, logger: Logger, messenger: Messenger) {
    try {
      const reply: ReplyPayload = {
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: 'Hello, user',
          },
          {
            type: 'text',
            text: 'May I help you?',
          },
        ],
      };
      messenger.sendReply(reply);
      logger.info('handler MessageEvent success');
    } catch (error) {
      logger.error(`handler MessageEvent failed. Errors: ${error}`);
    }
  }

  private handlerFollowEvent(event: WebhookEvent, logger: Logger, messenger: Messenger) {
    // TODO: do something
    logger.info(`handler FollowWebhookEvent`);
  }
}
