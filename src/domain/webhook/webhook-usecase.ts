import { Container } from 'typedi';

import { LoggerContainerKey } from '../../core/plugin/logger';
import { AccessTokenRepository } from '../../domain/access-token/access-token-repository';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { MessagingUsecase } from '../../domain/messaging/messaging-usecase';
import { ReplyPayload } from '../../domain/messaging/messaging-dto';
import { WebhookEvent, WebhookEventType } from './webhook-dto';

export class WebhookUsecase {
  constructor(
    private messagingUsecase = Container.get(MessagingUsecase),
    private accessTokenRepo = Container.get(AccessTokenRepository),
    private logger = Container.get(LoggerContainerKey),
  ) {}

  async handleWebhookEvent(event: WebhookEvent, channelId: string) {
    const accessToken = await this.accessTokenRepo.getAccessTokenRecord(channelId);
    switch (event.type) {
      case WebhookEventType.message:
        await this.handlerMessageEvent(event, accessToken);
        break;

      case WebhookEventType.follow:
        await this.handlerFollowEvent(event, accessToken);
        break;

      default:
        break;
    }
  }

  private async handlerMessageEvent(event: WebhookEvent, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug('handlerMessageEvent');
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
    await this.messagingUsecase.sendReplyWithPayload(reply, accessTokenRecord);
  }

  private async handlerFollowEvent(event: WebhookEvent, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug('handlerFollowEvent');
    const reply: ReplyPayload = {
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'Greetings!',
        },
      ],
    };
    await this.messagingUsecase.sendReplyWithPayload(reply, accessTokenRecord);
  }
}
