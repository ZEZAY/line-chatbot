import { Container } from 'typedi';

import { Logger } from '../../core/plugin/logger';
import { FollowWebhookEvent, MessageWebhookEvent, WebhookEvent, WebhookEventType } from './webhook-dto';


export class WebhookUsecase {
  async handleWebhookEvent(event: WebhookEvent, logger: Logger = Container.get('Logger')): Promise<void> {
    switch (event.type) {
      case WebhookEventType.message:
        this.handlerMessageEvent(event, logger);
        break;

      case WebhookEventType.follow:
        this.handlerFollowEvent(event, logger);
        break;

      default:
        break;
    }
  }

  private handlerMessageEvent(event: MessageWebhookEvent, logger: Logger) {
    // TODO: do something
    logger.info(`handler MessageWebhookEvent`);
  }

  private handlerFollowEvent(event: FollowWebhookEvent, logger: Logger) {
    // TODO: do something
    logger.info(`handler FollowWebhookEvent`);
  }
}
