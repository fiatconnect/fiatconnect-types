import { z } from 'zod'
import { kycSchemaSchema, kycStatusSchema } from './kyc'
import { transferStatusResponseSchema } from './transfer'

export enum WebhookEventType {
  KycStatusEvent = 'WebhookKycStatusEvent',
  TransferInStatusEvent = 'WebhookTransferInStatusEvent',
  TransferOutStatusEvent = 'WebhookTransferOutStatusEvent',
}
export const webhookEventTypeSchema = z.nativeEnum(WebhookEventType)

export const webhookRequestBodySchema = z.union([
  z.object({
    eventType: z.literal(WebhookEventType.KycStatusEvent),
    provider: z.string(),
    eventId: z.string(),
    timestamp: z.string(),
    address: z.string(),
    payload: z.object({
      kycSchema: kycSchemaSchema,
      kycStatus: kycStatusSchema,
    }),
  }),
  z.object({
    eventType: z.literal(WebhookEventType.TransferInStatusEvent),
    provider: z.string(),
    eventId: z.string(),
    timestamp: z.string(),
    address: z.string(),
    payload: transferStatusResponseSchema,
  }),
  z.object({
    eventType: z.literal(WebhookEventType.TransferOutStatusEvent),
    provider: z.string(),
    eventId: z.string(),
    timestamp: z.string(),
    address: z.string(),
    payload: transferStatusResponseSchema,
  }),
])
export type WebhookRequestBody = z.infer<typeof webhookRequestBodySchema>
