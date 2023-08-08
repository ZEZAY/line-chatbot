import Container from 'typedi';
import axios, { AxiosRequestConfig } from 'axios';

import { LoggerContainerKey } from '../../core/plugin';
import { BroadcastPayload, DirectMessagePayload, ReplyPayload } from './messaging-dto';

export class Messenger {
  private baseUrl = 'https://api.line.me/v2/bot/message';
  private requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.channelAccessToken}`,
    },
  };

  constructor(private channelAccessToken: string = Container.get('ChannelAccessToken'), private logger = Container.get(LoggerContainerKey)) {}

  async sendBroadcast(payload: ReplyPayload) {
    const response = await axios.post(this.baseUrl + '/reply', payload, this.requestConfig).catch(error => {
      throw new Error(`sendBroadcast failed. Error: ${error}. Message: ${error.response.data.message}`);
    });

    // TODO: check response
    this.logger.info(`sendBroadcast success`);
    return response;
  }

  async sendReply(payload: BroadcastPayload) {
    console.log(this.channelAccessToken);

    const response = await axios.post(this.baseUrl + '/broadcast', payload, this.requestConfig).catch(error => {
      throw new Error(`sendReply failed. Error: ${error}. Message: ${error.response.data.message}`);
    });

    // TODO: check response
    this.logger.info(`sendReply success`);
    return response;
  }

  async sendDirectMessage(payload: DirectMessagePayload) {
    const response = await axios.post(this.baseUrl + '/push', payload, this.requestConfig).catch(error => {
      throw new Error(`sendDirectMessage failed. Error: ${error}. Message: ${error.response.data.message}`);
    });

    // TODO: check response
    this.logger.info(`sendDirectMessage success`);
    return response;
  }
}
