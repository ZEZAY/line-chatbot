import { Static, Type } from '@sinclair/typebox';

export const AccessTokenRecordSchema = Type.Object({
  ChannelId: Type.String(),
  AccessToken: Type.String(),
});

export type AccessTokenRecord = Static<typeof AccessTokenRecordSchema>;
