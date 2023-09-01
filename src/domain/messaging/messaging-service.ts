import Container from 'typedi';
import axios from 'axios';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class MessagingService {
  constructor(private logger = Container.get(LoggerContainerKey)) {}

  async sendBroadcast(payload: BroadcastPayload, accessTokenRecord: AccessTokenRecord) {
    const endpoint = 'https://api.line.me/v2/bot/message/broadcast';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessTokenRecord.AccessToken}`,
      },
    };
    const response = await axios.post(endpoint, payload, config);
    this.logger.info('sendBroadcast success');
    return response;
  }

  async sendReply(payload: ReplyPayload, accessTokenRecord: AccessTokenRecord) {
    const endpoint = 'https://api.line.me/v2/bot/message/reply';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessTokenRecord.AccessToken}`,
      },
    };
    const response = await axios.post(endpoint, payload, config);
    this.logger.info('sendReply success');
    return response;
  }

  async sendDirectMessage(payload: DirectMessagePayload, accessTokenRecord: AccessTokenRecord) {
    const endpoint = 'https://api.line.me/v2/bot/message/push';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessTokenRecord.AccessToken}`,
      },
    };
    const response = await axios.post(endpoint, payload, config);
    this.logger.info('sendDirectMessage success');
    return response;
  }
}
