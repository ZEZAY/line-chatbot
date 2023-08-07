import { FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

interface WebhookRequestInterface extends FastifyRequest {
  events: WebhookEvent[];
}

export type WebhookRequest = FastifyRequest<{ Body: WebhookRequestInterface }>;

// TODO: use typebox to custom import types

type WebhookEventCommonProperties = {
  mode: string;
  timestamp: number;
  source: Source;
  webhookEventId: string;
  deliveryContext: DeliveryContext;
};

export type Source = UserSource | GroupChatSource | MultiPersonChatSource;

export type UserSource = {
  type: 'user';
  userId: string;
};

export type GroupChatSource = {
  type: 'group';
  userId?: string;
  groupId: string;
};

export type MultiPersonChatSource = {
  type: 'multi-person';
  userId?: string;
  roomId: string;
};

const DeliveryContextScema = Type.Object({ isRedelivery: Type.Boolean() });
export type DeliveryContext = Static<typeof DeliveryContextScema>;

export enum WebhookEventType {
  message = 'message',
  follow = 'follow',
}

export type WebhookEvent = MessageWebhookEvent | FollowWebhookEvent;

export type MessageWebhookEvent = WebhookEventCommonProperties & {
  type: WebhookEventType.message;
  replyToken: string;
  message: EventMessage;
};

const EventMessageSchema = Type.Object({
  id: Type.String(),
  type: Type.String(),
  text: Type.String(),
});

export type EventMessage = Static<typeof EventMessageSchema>;

export type FollowWebhookEvent = WebhookEventCommonProperties & {
  type: WebhookEventType.follow;
  replyToken: string;
};

// const EmojiSchema = Type.Object({
//   index: Type.Number(),
//   length: Type.Number(),
//   productId: Type.String(),
//   emojiId: Type.String(),
// });

// const MentionedSchema = Type.Object({
//   index: Type.Number(),
//   length: Type.Number(),
//   type: Type.String(),
//   userId: Type.String(),
// });

// type Emoji = Static<typeof EmojiSchema>;
// type Mentioned = Static<typeof MentionedSchema>;
// type Mention = { mentionees: Mentioned[] };

// interface TextMessageInterface extends EventMessage {
//   text: string;
//   emojis?: Array<Emoji>;
//   mention: Mention;
// }

// https://developers.line.biz/en/reference/messaging-api/#wh-image
// interface ImageMessageInterface extends Message {}
// interface VideoMessageInterface extends Message {}
// interface AudioMessageInterface extends Message {}
// interface FileMessageInterface extends Message {}
// interface LocationMessageInterface extends Message {}
// interface StickerMessageInterface extends Message {}
