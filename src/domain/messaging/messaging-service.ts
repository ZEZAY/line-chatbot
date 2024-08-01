import Container from 'typedi';
import axios from 'axios';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

// call by service only
export class MessagingApi {
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
    // what body will be
    const response = await axios.post<{foo: string}>(endpoint, payload, config);
    response.data.foo
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
