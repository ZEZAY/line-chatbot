import * as mongoDB from 'mongodb';
import Container from 'typedi';

import { Logger } from '../../core/plugin';
import { AccessTokenRecord } from './mongodb-dto';

export async function connectToDatabase(database_uri: string, database_name: string, collection_name: string) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(database_uri);
  await client.connect();

  const db: mongoDB.Db = client.db(database_name);
  const collection: mongoDB.Collection = db.collection(collection_name);

  Container.set('MongoDB', db);
  Container.set('Collection', collection);
}

export class MongoDBUsecase {
  constructor(
    private db: mongoDB.Db = Container.get('MongoDB'),
    private collection: mongoDB.Collection = Container.get('Collection'),
    private logger: Logger = Container.get('Logger'),
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
