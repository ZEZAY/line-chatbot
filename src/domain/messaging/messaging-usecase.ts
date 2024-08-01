import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRepository } from '../../domain/access-token/access-token-repository';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { MessagingApi } from './messaging-service';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class MessagingService {
  constructor(
    private messagingService = Container.get(MessagingApi),
    private accessTokenRepo = Container.get(AccessTokenRepository),
    private logger = Container.get(LoggerContainerKey),
  ) {}

  async sendBroadcastWithPayload(payload: BroadcastPayload, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug(`sendBroadcastWithPayload payload=${payload}`);
    const response = await this.messagingService.sendBroadcast(payload, accessTokenRecord);
    return response;
  }

  async sendReplyWithPayload(payload: ReplyPayload, accessTokenRecord: AccessTokenRecord) {
    this.logger.debug(`sendReplyWithPayload payload=${payload}`);
    const response = await this.messagingService.sendReply(payload, accessTokenRecord);
    return response;
  }

  async sendDirectMessageWithPayload(payload: DirectMessagePayload) {
    this.logger.debug(`sendDirectMessageWithPayload payload=${payload}`);
    // should be in service
    const accessToken = await this.accessTokenRepo.getByChannelId(payload.channelId);
    const response = await this.messagingService.sendDirectMessage(payload, accessToken);
    return response;
  }
}
