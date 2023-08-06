import Container from 'typedi';

import { Logger } from '../../core/plugin';
import { IController } from '../../core/interface';
import { WebhookUsecase } from './webhook-usecase';
import { WebhookEvent } from './webhook-dto';

export enum WebhookJobName {
  HandleWebhookEvent = 'handleWebhookEvent',
}

export class WebhookController implements IController {
  controllerName = 'webhook';

  constructor(private webhookUsecase: WebhookUsecase = Container.get('WebhookUsecase'), private logger: Logger = Container.get('Logger')) {}

  getClassName(): string {
    return this.constructor.name;
  }

  getJobName(): string[] {
    return Object.values(WebhookJobName);
  }

  handleJob(name: string, data: WebhookEvent): Promise<void> {
    switch (name as WebhookJobName) {
      case WebhookJobName.HandleWebhookEvent: {
        // TODO: validate input data
        return this.webhookUsecase.handleWebhookEvent(data, this.logger);
      }
      default:
        throw new Error(`Controller does not have job [controller=${this.controllerName}, job=${name}]`);
    }
  }
}
