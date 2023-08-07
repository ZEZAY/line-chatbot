import { Static, Type } from '@sinclair/typebox';

export type Source = UserSource | GroupChatSource | MultiPersonChatSource;

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
