import { Static, Type } from '@sinclair/typebox';

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
