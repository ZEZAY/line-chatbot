import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { MessagingService } from './messaging-service';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class MessagingUsecase {
  constructor(private messagingService = Container.get(MessagingService), private logger = Container.get(LoggerContainerKey)) {}

  async sendReplyWithPayload(payload: ReplyPayload, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug(`sendReplyWithPayload payload=${payload}`);
    const response = await this.messagingService.sendReply(payload, accessTokenRecord);
    return response;
  }

  async sendDirectMessageWithPayload(payload: DirectMessagePayload, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug(`sendDirectMessageWithPayload payload=${payload}`);
    const response = await this.messagingService.sendDirectMessage(payload, accessTokenRecord);
    return response;
  }

  async sendBroadcastWithPayload(payload: BroadcastPayload, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug(`sendBroadcastWithPayload payload=${payload}`);
    const response = await this.messagingService.sendBroadcast(payload, accessTokenRecord);
    return response;
  }
}
