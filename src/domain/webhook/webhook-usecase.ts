import { Container } from 'typedi';

import { Logger, LoggerContainerKey } from '../../core/plugin/logger';
import { Messenger } from '../../domain/messaging/messaging-service';
import { ReplyPayload } from '../../domain/messaging/messaging-dto';
import { WebhookEvent, WebhookEventType } from './webhook-dto';

export class WebhookUsecase {
  constructor(private logger = Container.get(LoggerContainerKey), private messenger = Container.get(Messenger)) {}

  async handleWebhookEvent(event: WebhookEvent): Promise<void> {
    switch (event.type) {
      case WebhookEventType.message:
        this.handlerMessageEvent(event);
        break;

      case WebhookEventType.follow:
        this.handlerFollowEvent(event);
        break;

      default:
        break;
    }
  }

  private handlerMessageEvent(event: WebhookEvent) {
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
      this.messenger.sendReply(reply);
      this.logger.info('handler MessageEvent success');
    } catch (error) {
      this.logger.error(`handler MessageEvent failed. Errors: ${error}`);
    }
  }

  private handlerFollowEvent(event: WebhookEvent) {
    // TODO: do something
    this.logger.info(`handler FollowWebhookEvent`);
  }
}
