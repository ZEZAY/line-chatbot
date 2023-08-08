import * as mongoDB from 'mongodb';
import Container from 'typedi';

import { LoggerContainerKey } from '../../core/plugin';
import { AccessTokenRecord } from './mongodb-dto';

export class MongoDBUsecase {
  constructor(
    private db: mongoDB.Db = Container.get(mongoDB.Db),
    private collection: mongoDB.Collection = Container.get(mongoDB.Collection),
    private logger = Container.get(LoggerContainerKey),
  ) {}

  async saveAccessToken(channelId: string, token: string) {
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

  async getAccessToken(channelId: string): Promise<string> {
    const record = await this.collection.findOne<AccessTokenRecord>({ ChannelId: channelId });
    if (!record) {
      this.logger.error('record not exist');
      throw new Error(`getAccessToken failed. Error: no record for ChannelId="${channelId}"`);
    }
    return record.AccessToken;
  }

  async updateAccessToken(channelId: string, newToken: string) {
    return this.collection.findOneAndUpdate(
      {
        ChannelId: channelId,
      },
      {
        $set: { AccessToken: newToken },
      },
    );
  }

  async deleteAccessToken(channelId: string) {
    return this.collection.findOneAndDelete({ ChannelId: channelId });
  }
}
