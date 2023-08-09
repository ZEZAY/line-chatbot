import { Static, Type } from '@sinclair/typebox';

export const TextMessageSchema = Type.Object({
  type: Type.String(),
  text: Type.String(),
});

export const StickerMessageSchema = Type.Object({
  type: Type.String(),
  packageId: Type.Number(),
  stickerId: Type.Number(),
});

export type Message = TextMessage | StickerMessage;

export type TextMessage = Static<typeof TextMessageSchema>;
export type StickerMessage = Static<typeof StickerMessageSchema>;

export const BroadcastPayloadSchema = Type.Object({
  messages: Type.Array(TextMessageSchema),
  notificationDisabled: Type.Optional(Type.Boolean()),
});

export const ReplyPayloadSchema = Type.Object({
  replyToken: Type.String(),
  messages: Type.Array(TextMessageSchema),
  notificationDisabled: Type.Optional(Type.Boolean()),
});

export const DirectMessagePayloadSchema = Type.Object({
  channelId: Type.String(),
  to: Type.String(),
  messages: Type.Array(TextMessageSchema),
  notificationDisabled: Type.Optional(Type.Boolean()),
});

export type BroadcastPayload = Static<typeof BroadcastPayloadSchema>;
export type ReplyPayload = Static<typeof ReplyPayloadSchema>;
export type DirectMessagePayload = Static<typeof DirectMessagePayloadSchema>;
