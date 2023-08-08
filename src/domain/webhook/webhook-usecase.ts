import { Container } from 'typedi';

import { LoggerContainerKey } from '../../core/plugin/logger';
import { Messenger } from '../../domain/messaging/messaging-service';
import { ReplyPayload } from '../../domain/messaging/messaging-dto';
import { WebhookEvent, WebhookEventType } from './webhook-dto';

export class WebhookUsecase {
  constructor(private logger = Container.get(LoggerContainerKey), private messenger = Container.get(Messenger)) {}

  async handleWebhookEvent(event: WebhookEvent) {
    switch (event.type) {
      case WebhookEventType.message:
        await this.handlerMessageEvent(event);
        break;

      case WebhookEventType.follow:
        await this.handlerFollowEvent(event);
        break;

      default:
        break;
    }
  }

  private async handlerMessageEvent(event: WebhookEvent) {
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
    await this.messenger.sendReply(reply).catch(error => {
      this.logger.error(`handlerMessageEvent failed. Errors: ${error}`);
      return;
    });
    this.logger.info('handlerMessageEvent success');
  }

  private async handlerFollowEvent(event: WebhookEvent) {
    const reply: ReplyPayload = {
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'Greetings!',
        },
      ],
    };
    await this.messenger.sendReply(reply).catch(error => {
      this.logger.error(`handlerFollowEvent failed. Errors: ${error}`);
      return;
    });
    this.logger.info('handlerFollowEvent success');
  }
}
