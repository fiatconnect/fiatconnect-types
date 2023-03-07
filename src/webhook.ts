import { z } from 'zod'
import { kycSchemaSchema, kycStatusSchema } from './kyc'
import {
  transferInStatusResponseSchema,
  transferOutStatusResponseSchema,
} from './transfer'

export enum WebhookEventType {
  KycStatusEvent = 'WebhookKycStatusEvent',
  TransferInStatusEvent = 'WebhookTransferInStatusEvent',
  TransferOutStatusEvent = 'WebhookTransferOutStatusEvent',
}
export const webhookEventTypeSchema = z.nativeEnum(WebhookEventType, {
  description: 'webhookEventTypeSchema',
})

const webhookEventBodyBaseSchema = z.object({
  provider: z.string(),
  eventId: z.string(),
  timestamp: z.string(),
  address: z.string(),
})

export const webhookRequestBodyTransferInSchema = z.intersection(
  webhookEventBodyBaseSchema,
  z.object({
    eventType: z.literal(WebhookEventType.TransferInStatusEvent),
    payload: transferInStatusResponseSchema,
  }),
  {
    description: 'webhookRequestBodyTransferInSchema',
  },
)
export type WebhookRequestBodyTransferIn = z.infer<
  typeof webhookRequestBodyTransferInSchema
>

export const webhookRequestBodyTransferOutSchema = z.intersection(
  webhookEventBodyBaseSchema,
  z.object({
    eventType: z.literal(WebhookEventType.TransferOutStatusEvent),
    payload: transferOutStatusResponseSchema,
  }),
  {
    description: 'webhookRequestBodyTransferOutSchema',
  },
)
export type WebhookRequestBodyTransferOut = z.infer<
  typeof webhookRequestBodyTransferOutSchema
>

export const webhookRequestBodyKycSchema = z.intersection(
  webhookEventBodyBaseSchema,
  z.object({
    eventType: z.literal(WebhookEventType.KycStatusEvent),
    payload: z.object({
      kycSchema: kycSchemaSchema,
      kycStatus: kycStatusSchema,
    }),
  }),
  {
    description: 'webhookRequestBodyKycSchema',
  },
)
export type WebhookRequestBodyKyc = z.infer<typeof webhookRequestBodyKycSchema>

export const webhookRequestBodySchema = z.union(
  [
    webhookRequestBodyTransferInSchema,
    webhookRequestBodyTransferOutSchema,
    webhookRequestBodyKycSchema,
  ],
  { description: 'webhookRequestBodySchema' },
)
export type WebhookRequestBody = z.infer<typeof webhookRequestBodySchema>
