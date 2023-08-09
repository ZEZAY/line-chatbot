import { Collection } from 'mongodb';
import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from './access-token-dto';

export class AccessTokenRepository {
  constructor(private collection: Collection<AccessTokenRecord>, private logger = Container.get(LoggerContainerKey)) {}

  async setAccessTokenRecord(channelId: string, token: string) {
    const newRecord: AccessTokenRecord = {
      ChannelId: channelId,
      AccessToken: token,
    };
    const record = this.collection.updateOne(
      {
        ChannelId: channelId,
      },
      {
        $setOnInsert: newRecord,
      },
      { upsert: true },
    );
    this.logger.info('setAccessTokenRecord success');
    return record;
  }

  async getAccessTokenRecord(channelId: string) {
    const record = await this.collection.findOne<AccessTokenRecord>({ ChannelId: channelId });
    if (!record) {
      throw new Error(`getAccessToken failed. Error: record not exist for ChannelId="${channelId}"`);
    }
    this.logger.info('getAccessTokenRecord success');
    return record;
  }

  async updateAccessTokenRecord(channelId: string, newToken: string) {
    const record = this.collection.findOneAndUpdate(
      {
        ChannelId: channelId,
      },
      {
        $set: { AccessToken: newToken },
      },
    );
    this.logger.info('updateAccessTokenRecord success');
    return record;
  }

  async deleteAccessTokenRecord(channelId: string) {
    const record = this.collection.findOneAndDelete({ ChannelId: channelId });
    this.logger.info('deleteAccessTokenRecord success');
    return record;
  }
}
