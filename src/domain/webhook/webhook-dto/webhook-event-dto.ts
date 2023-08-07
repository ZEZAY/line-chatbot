import { Static, Type } from '@sinclair/typebox';
import { UserSourceSchema } from './source-dto';
import { DeliveryContextSchema } from './delivery-context-dto';
import { EventMessageSchema } from './event-message-dto';

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
