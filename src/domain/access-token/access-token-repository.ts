import { Collection } from 'mongodb';
import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from './access-token-dto';

export class AccessTokenRepository {
  constructor(private collection: Collection<AccessTokenRecord>, private logger = Container.get(LoggerContainerKey)) {}

  async setAccessTokenRecord(channelId: string, token: string) {
    const record: AccessTokenRecord = {
      ChannelId: channelId,
      AccessToken: token,
    };
    return this.collection.updateOne(
      {
        ChannelId: channelId,
      },
      {
        $setOnInsert: record,
      },
      { upsert: true },
    );
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
    return this.collection.findOneAndUpdate(
      {
        ChannelId: channelId,
      },
      {
        $set: { AccessToken: newToken },
      },
    );
  }

  async deleteAccessTokenRecord(channelId: string) {
    return this.collection.findOneAndDelete({ ChannelId: channelId });
  }
}
