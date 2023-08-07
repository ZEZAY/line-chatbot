import { FastifyRequest } from 'fastify';

import { WebhookEvent } from './webhook-event-dto';

interface WebhookRequestInterface extends FastifyRequest {
  events: WebhookEvent[];
}

export type WebhookRequest = FastifyRequest<{ Body: WebhookRequestInterface }>;
