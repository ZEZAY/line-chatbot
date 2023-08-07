import { Static, Type } from '@sinclair/typebox';

export const DeliveryContextSchema = Type.Object({ isRedelivery: Type.Boolean() });

export type DeliveryContext = Static<typeof DeliveryContextSchema>;
