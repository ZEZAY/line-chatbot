import Container from 'typedi';

import { Messenger } from '../domain/messaging/messaging-service';
import { DirectMessagePayload } from '../domain/messaging/messaging-dto';
import { WebhookEvent, WebhookRequest, WebhookUsecase } from '../domain/webhook';
import { LoggerContainerKey } from './plugin/logger';

export class LineChatbotUsecase {
  constructor(
    private messenger = Container.get(Messenger),
    private webhookUsecase = Container.get(WebhookUsecase),
    private logger = Container.get(LoggerContainerKey),
  ) {}

  // TODO: create response struct
  receiveWebhook(req: WebhookRequest) {
    try {
      const events: WebhookEvent[] = req.body.events || [];
      events.map(event => this.webhookUsecase.handleWebhookEvent(event, this.logger, this.messenger));
    } catch (err) {
      this.logger.error(`read webhook payload failed, ${err}`);
    }

    // TODO: update response
    return { isError: false, msg: '___something___' };
  }

  sendMessageToUser(message: DirectMessagePayload) {
    this.messenger.sendDirectMessage(message);
  }
}
