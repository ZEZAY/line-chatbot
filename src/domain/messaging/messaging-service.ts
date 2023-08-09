import Container from 'typedi';
import axios, { AxiosRequestConfig } from 'axios';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecordContainerKey } from '../access-token/access-token-dto';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class MessagingService {
  private baseUrl = 'https://api.line.me/v2/bot/message';
  private requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.channelAccessToken}`,
    },
  };

  constructor(
    private channelAccessToken = Container.get(AccessTokenRecordContainerKey),
    private logger = Container.get(LoggerContainerKey),
  ) {}

  async sendBroadcast(payload: BroadcastPayload) {
    const response = await axios.post(this.baseUrl + '/reply', payload, this.requestConfig);
    this.logger.info('sendBroadcast success');
    return response;
  }

  async sendReply(payload: ReplyPayload) {
    const response = await axios.post(this.baseUrl + '/broadcast', payload, this.requestConfig);
    this.logger.info('sendReply success');
    return response;
  }

  async sendDirectMessage(payload: DirectMessagePayload) {
    const response = await axios.post(this.baseUrl + '/push', payload, this.requestConfig);
    this.logger.info('sendDirectMessage success');
    return response;
  }
}
