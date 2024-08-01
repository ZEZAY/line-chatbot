import { newLogger } from '../../core/plugin';
import { AccessTokenRepository } from '../../domain/access-token/access-token-repository';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { MessagingApi } from './messaging-service';
import { MessagingService } from './messaging-usecase';
import { Collection } from 'mongodb';

jest.mock('./messaging-service');
jest.mock('../../domain/access-token/access-token-repository');

const MockedMessagingService = jest.mocked(MessagingApi, { shallow: true }) as jest.Mock<MessagingApi>;
const MockedAccessTokenRepository = jest.mocked(AccessTokenRepository, { shallow: true }) as jest.Mock<AccessTokenRepository>;

describe('Test messaging usecase', () => {
  let messagingUsecase: MessagingService;
  let mockedMessagingService: MessagingApi;
  let mockedAccessTokenRepository: AccessTokenRepository;

  beforeAll(async () => {
    const logger = newLogger('debug', 'test');
    const collection = Collection<AccessTokenRecord>;

    mockedMessagingService = new MockedMessagingService(logger) as jest.Mocked<MessagingApi>;
    mockedMessagingService.sendBroadcast = jest.fn();
    mockedMessagingService.sendReply = jest.fn();
    mockedMessagingService.sendDirectMessage = jest.fn();

    mockedAccessTokenRepository = new MockedAccessTokenRepository(collection, logger) as jest.Mocked<AccessTokenRepository>;
    mockedAccessTokenRepository.getByChannelId = jest.fn().mockReturnValue('some_access_token');

    messagingUsecase = new MessagingService(mockedMessagingService, mockedAccessTokenRepository, logger);
  });

  test('test sendBroadcastWithPayload', async () => {
    const payload = {
      messages: [
        {
          type: 'text',
          text: 'hello everyone',
        },
      ],
    };
    const tokenRecord = { ChannelId: 'channel_101', AccessToken: 'token' };
    await messagingUsecase.sendBroadcastWithPayload(payload, tokenRecord);
    expect(mockedMessagingService.sendBroadcast).toHaveBeenCalledWith(payload, tokenRecord);
  });
  test('test sendReplyWithPayload', async () => {
    const payload = {
      replyToken: 'some_reply_token',
      messages: [
        {
          type: 'text',
          text: 'May I help you?',
        },
      ],
    };
    const tokenRecord = { ChannelId: 'channel_abc', AccessToken: 'token' };
    await messagingUsecase.sendReplyWithPayload(payload, tokenRecord);
    expect(mockedMessagingService.sendReply).toHaveBeenCalledWith(payload, tokenRecord);
  });
  test('test sendDirectMessageWithPayload', async () => {
    const payload = {
      channelId: 'channel_123',
      to: 'some_user_id',
      messages: [
        {
          type: 'text',
          text: 'hello user',
        },
      ],
    };
    const tokenRecord = { ChannelId: 'channel_123', AccessToken: 'token' };
    await messagingUsecase.sendDirectMessageWithPayload(payload);
    expect(mockedAccessTokenRepository.getByChannelId).toHaveBeenCalledWith(tokenRecord.ChannelId);
    expect(mockedMessagingService.sendDirectMessage).toHaveBeenCalledWith(payload, 'some_access_token');
  });
});
