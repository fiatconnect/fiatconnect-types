import { z } from 'zod'
import { fiatTypeSchema, cryptoTypeSchema } from './quote'

export enum TransferType {
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
}
export const transferTypeSchema = z.nativeEnum(TransferType)

export enum TransferStatus {
  TransferStarted = 'TransferStarted',
  TransferFiatFundsDebited = 'TransferFiatFundsDebited',
  TransferSendingCryptoFunds = 'TransferSendingCryptoFunds',
  TransferAmlFailed = 'TransferAmlFailed',
  TransferReadyForUserToSendCryptoFunds = 'TransferReadyForUserToSendCryptoFunds',
  TransferReceivedCryptoFunds = 'TransferReceivedCryptoFunds',
  TransferComplete = 'TransferComplete',
  TransferFailed = 'TransferFailed',
}
export const transferStatusSchema = z.nativeEnum(TransferStatus)

/*
/ Transfer Endpoint Types
*/

export const transferRequestBodySchema = z.object({
  fiatAccountId: z.string(),
  quoteId: z.string(),
})
export type TransferRequestBody = z.infer<typeof transferRequestBodySchema>

export const transferResponseSchema = z.object({
  transferId: z.string(),
  transferStatus: transferStatusSchema,
  transferAddress: z.string(),
})
export type TransferResponse = z.infer<typeof transferResponseSchema>

export const transferStatusRequestParamsSchema = z.object({
  transferId: z.string(),
})
export type TransferStatusRequestParams = z.infer<typeof transferStatusRequestParamsSchema>

export const transferStatusResponseSchema = z.object({
  status: transferStatusSchema,
  transferType: transferTypeSchema,
  fiatType: fiatTypeSchema,
  cryptoType: cryptoTypeSchema,
  amountProvided: z.string(),
  amountReceived: z.string(),
  fee: z.string().optional(),
  fiatAccountId: z.string(),
  transferId: z.string(),
  transferAddress: z.string(),
})
export type TransferStatusResponse = z.infer<typeof transferStatusResponseSchema>

