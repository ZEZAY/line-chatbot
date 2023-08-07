import Container from 'typedi';

import { DirectMessagePayload, Messenger } from '../domain/messaging';
import { WebhookController, WebhookEvent, WebhookJobName, WebhookRequest } from '../domain/webhook';
import { Logger } from './plugin/logger';

export class LineChatbotUsecase {
  constructor(
    private messenger: Messenger = Container.get('Messenger'),
    private webhookController: WebhookController = Container.get('WebhookController'),
    private logger: Logger = Container.get('Logger'),
  ) {}

  // TODO: create response struct
  receiveWebhook(req: WebhookRequest) {
    try {
      const events: WebhookEvent[] = req.body.events || [];
      events.map(event => this.webhookController.handleJob(WebhookJobName.HandleWebhookEvent, event));
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
