import { Container } from 'typedi';

import { LoggerContainerKey } from '../../core/plugin/logger';
import { MessagingUsecase } from '../../domain/messaging/messaging-usecase';
import { ReplyPayload } from '../../domain/messaging/messaging-dto';
import { WebhookEvent, WebhookEventType } from './webhook-dto';

export class WebhookUsecase {
  constructor(private messagingUsecase = Container.get(MessagingUsecase), private logger = Container.get(LoggerContainerKey)) {}

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
    await this.messagingUsecase.sendReplyWithPayload(reply);
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
    await this.messagingUsecase.sendReplyWithPayload(reply);
    this.logger.info('handlerFollowEvent success');
  }
}
