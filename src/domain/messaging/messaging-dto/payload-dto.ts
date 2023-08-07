import { Static, Type } from '@sinclair/typebox';

import { TextMessageSchema } from './message-dto';

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
  to: Type.String(),
  messages: Type.Array(TextMessageSchema),
  notificationDisabled: Type.Optional(Type.Boolean()),
});

export type BroadcastPayload = Static<typeof BroadcastPayloadSchema>;
export type ReplyPayload = Static<typeof ReplyPayloadSchema>;
export type DirectMessagePayload = Static<typeof DirectMessagePayloadSchema>;
