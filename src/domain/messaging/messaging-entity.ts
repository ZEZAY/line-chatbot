import Container from 'typedi';
import axios, { AxiosRequestConfig } from 'axios';

import { DotEnvConfig, Logger } from '../../core/plugin';
import { BroadcastPayload, PushMessagePayload, ReplyPayload } from './messaging-dto';

export class Messenger {
  private config: DotEnvConfig = Container.get('DotEnvConfig');
  private baseUrl = 'https://api.line.me/v2/bot/message';
  private requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.CHANNEL_ACCESS_TOKEN}`,
    },
  };

  constructor(private logger: Logger = Container.get('Logger')) {}

  async sendBroadcast(payload: ReplyPayload) {
    const response = await axios.post(this.baseUrl + '/reply', payload, this.requestConfig).catch(error => {
      this.logger.error(`sendBroadcast failed. Error: ${error}. Message: ${error.response.data.message}`);
    });

    // TODO: check response
    this.logger.info(`sendBroadcast success`);
    return response;
  }

  async sendReply(payload: BroadcastPayload) {
    const response = await axios.post(this.baseUrl + '/broadcast', payload, this.requestConfig).catch(error => {
      this.logger.error(`sendReply failed. Error: ${error}. Message: ${error.response.data.message}`);
    });

    // TODO: check response
    this.logger.info(`sendReply success`);
    return response;
  }
}
