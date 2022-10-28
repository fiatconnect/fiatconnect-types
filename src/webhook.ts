import { z } from 'zod'

export enum WebhookEventType {
  KycStatusEvent = 'WebhookKycStatusEvent',
  TransferInStatusEvent = 'WebhookTransferInStatusEvent',
  TransferOutStatusEvent = 'WebhookTransferOutStatusEvent',
}
export const webhookEventTypeSchema = z.nativeEnum(WebhookEventType)
