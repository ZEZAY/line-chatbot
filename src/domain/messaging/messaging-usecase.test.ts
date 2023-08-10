import { newLogger } from '../../core/plugin';
import { AccessTokenRepository } from '../../domain/access-token/access-token-repository';
import { AccessTokenRecord } from '../../domain/access-token/access-token-dto';
import { MessagingService } from './messaging-service';
import { MessagingUsecase } from './messaging-usecase';
import { Collection } from 'mongodb';

jest.mock('./messaging-service');
jest.mock('../../domain/access-token/access-token-repository');

const MockedMessagingService = jest.mocked(MessagingService, { shallow: true }) as jest.Mock<MessagingService>;
const MockedAccessTokenRepository = jest.mocked(AccessTokenRepository, { shallow: true }) as jest.Mock<AccessTokenRepository>;

describe('Test messaging usecase', () => {
  let messagingUsecase: MessagingUsecase;
  let mockedMessagingService: MessagingService;
  let mockedAccessTokenRepository: AccessTokenRepository;

  beforeAll(async () => {
    const logger = newLogger('debug', 'test');
    const collection = Collection<AccessTokenRecord>;

    mockedMessagingService = new MockedMessagingService(logger) as jest.Mocked<MessagingService>;
    mockedMessagingService.sendBroadcast = jest.fn();
    mockedMessagingService.sendReply = jest.fn();
    mockedMessagingService.sendDirectMessage = jest.fn();

    mockedAccessTokenRepository = new MockedAccessTokenRepository(collection, logger) as jest.Mocked<AccessTokenRepository>;
    mockedAccessTokenRepository.getAccessTokenRecord = jest.fn().mockReturnValue('some_access_token');

    messagingUsecase = new MessagingUsecase(mockedMessagingService, mockedAccessTokenRepository, logger);
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
    expect(mockedAccessTokenRepository.getAccessTokenRecord).toHaveBeenCalledWith(tokenRecord.ChannelId);
    expect(mockedMessagingService.sendDirectMessage).toHaveBeenCalledWith(payload, 'some_access_token');
  });
});
