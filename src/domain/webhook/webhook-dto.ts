import { FastifyRequest } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

export const UserSourceSchema = Type.Object({
  type: Type.String(),
  userId: Type.String(),
});

export const GroupChatSourceSchema = Type.Object({
  type: Type.String(),
  userId: Type.Optional(Type.String()),
  groupId: Type.String(),
});

export const MultiPersonChatSourceSchema = Type.Object({
  type: Type.String(),
  userId: Type.Optional(Type.String()),
  roomId: Type.String(),
});

export type UserSource = Static<typeof UserSourceSchema>;
export type GroupChatSource = Static<typeof GroupChatSourceSchema>;
export type MultiPersonChatSource = Static<typeof MultiPersonChatSourceSchema>;

export type Source = UserSource | GroupChatSource | MultiPersonChatSource;

export const DeliveryContextSchema = Type.Object({ isRedelivery: Type.Boolean() });

export type DeliveryContext = Static<typeof DeliveryContextSchema>;

const EmojiSchema = Type.Object({
  index: Type.Number(),
  length: Type.Number(),
  productId: Type.String(),
  emojiId: Type.String(),
});

const MentionedSchema = Type.Object({
  index: Type.Number(),
  length: Type.Number(),
  type: Type.String(),
  userId: Type.String(),
});

const MentionSchema = Type.Object({
  mentionees: Type.Array(MentionedSchema),
});

type Emoji = Static<typeof EmojiSchema>;
type Mentioned = Static<typeof MentionedSchema>;
type Mention = Static<typeof MentionSchema>;

export const EventMessageSchema = Type.Object({
  id: Type.String(),
  type: Type.String(),
  text: Type.String(),
  emojis: Type.Optional(Type.Array(Type.Object(EmojiSchema))),
  mention: Type.Optional(Type.Object(MentionSchema)),
});

export type EventMessage = Static<typeof EventMessageSchema>;

export enum WebhookEventType {
  message = 'message',
  follow = 'follow',
}

export const WebhookEventSchema = Type.Object({
  mode: Type.String(),
  timestamp: Type.Number(),
  source: Type.Object(UserSourceSchema),
  webhookEventId: Type.String(),
  deliveryContext: Type.Object(DeliveryContextSchema),

  type: Type.String(),
  replyToken: Type.String(),
  message: Type.Optional(Type.Object(EventMessageSchema)),
});

export type WebhookEvent = Static<typeof WebhookEventSchema>;

interface WebhookRequestInterface extends FastifyRequest {
  events: WebhookEvent[];
}

export type WebhookRequest = FastifyRequest<{ Body: WebhookRequestInterface; Params: { channelId: string } }>;
