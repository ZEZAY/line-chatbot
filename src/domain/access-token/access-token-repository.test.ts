import { MongoClient, Collection } from 'mongodb';

import { newLogger } from '../../core/plugin';
import { AccessTokenRepository } from './access-token-repository';
import { AccessTokenRecord } from './access-token-dto';

const config = {
  mongoUrl: 'mongodb://root:root@127.0.0.1:27017/test?authSource=admin',
  mongoDatabaseName: 'test',
  mongoCollectionName: 'test-access-token',
  testTimeout: 60 * 1000,
};

describe('Test accessToken repository', () => {
  let connection: MongoClient;
  let collection: Collection<AccessTokenRecord>;
  let accessTokenRepo: AccessTokenRepository;

  beforeAll(async () => {
    const client = new MongoClient(config.mongoUrl);
    connection = await client.connect();
    const db = client.db(config.mongoDatabaseName);
    collection = db.collection(config.mongoCollectionName);
    accessTokenRepo = new AccessTokenRepository(collection, newLogger('debug', 'test'));
  }, config.testTimeout);

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await collection.deleteMany({});
  });

  test('test setAccessTokenRecord', async () => {
    const record: AccessTokenRecord = {
      ChannelId: 'channel_1',
      AccessToken: 'token_1',
    };
    await accessTokenRepo.setAccessTokenRecord(record.ChannelId, record.AccessToken);
    const savedRecord = await collection.findOne({ ChannelId: record.ChannelId });

    expect(savedRecord?.ChannelId).toEqual(record.ChannelId);
    expect(savedRecord?.AccessToken).toEqual(record.AccessToken);
  });

  test('test getAccessTokenRecord', async () => {
    const record: AccessTokenRecord = {
      ChannelId: 'channel_2',
      AccessToken: 'token_2',
    };

    await collection.updateOne(
      {
        ChannelId: record.ChannelId,
      },
      {
        $setOnInsert: record,
      },
      { upsert: true },
    );
    const savedRecord = await accessTokenRepo.getByChannelId(record.ChannelId);

    expect(savedRecord?.ChannelId).toEqual(record.ChannelId);
    expect(savedRecord?.AccessToken).toEqual(record.AccessToken);
  });

  test('test updateAccessTokenRecord', async () => {
    const record: AccessTokenRecord = {
      ChannelId: 'channel_3',
      AccessToken: 'token_3',
    };
    const newAccessToken = 'new_token_3';

    await collection.updateOne(
      {
        ChannelId: record.ChannelId,
      },
      {
        $setOnInsert: record,
      },
      { upsert: true },
    );
    await accessTokenRepo.updateAccessTokenRecord(record.ChannelId, newAccessToken);
    const savedRecord = await collection.findOne({ ChannelId: record.ChannelId });

    expect(savedRecord?.ChannelId).toEqual(record.ChannelId);
    expect(savedRecord?.AccessToken).toEqual(newAccessToken);
  });

  test('test deleteAccessTokenRecord', async () => {
    const record: AccessTokenRecord = {
      ChannelId: 'channel_4',
      AccessToken: 'token_4',
    };

    await collection.updateOne(
      {
        ChannelId: record.ChannelId,
      },
      {
        $setOnInsert: record,
      },
      { upsert: true },
    );
    await accessTokenRepo.deleteAccessTokenRecord(record.ChannelId);
    const savedRecord = await collection.findOne({ ChannelId: record.ChannelId });

    expect(savedRecord).toEqual(null);
  });
});
