import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { Messenger } from './messaging-service';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class MessagingUsecase {
  constructor(private messenger = Container.get(Messenger), private logger = Container.get(LoggerContainerKey)) {}

  async sendReplyWithPayload(payload: ReplyPayload) {
    this.logger.debug(`sendReplyWithPayload payload=${payload}`)
    const response = await this.messenger.sendReply(payload);
    return response;
  }
  
  async sendDirectMessageWithPayload(payload: DirectMessagePayload) {
    this.logger.debug(`sendDirectMessageWithPayload payload=${payload}`)
    const response = await this.messenger.sendDirectMessage(payload);
    return response;
  }
  
  async sendBroadcastWithPayload(payload: BroadcastPayload) {
    this.logger.debug(`sendBroadcastWithPayload payload=${payload}`)
    const response = await this.messenger.sendBroadcast(payload);
    return response;
  }
}
