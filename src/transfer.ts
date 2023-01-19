import { z } from 'zod'
import { fiatAccountIdSchema } from './fiat-account'
import { fiatTypeSchema, cryptoTypeSchema } from './common'

export enum TransferType {
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
}
export const transferTypeSchema = z.nativeEnum(TransferType, {
  description: 'transferTypeSchema',
})

export enum TransferStatus {
  TransferStarted = 'TransferStarted',
  TransferFiatFundsDebited = 'TransferFiatFundsDebited',
  TransferReceivedFiatFunds = 'TransferReceivedFiatFunds',
  TransferSendingCryptoFunds = 'TransferSendingCryptoFunds',
  TransferAmlFailed = 'TransferAmlFailed',
  TransferReadyForUserToSendCryptoFunds = 'TransferReadyForUserToSendCryptoFunds',
  TransferReceivedCryptoFunds = 'TransferReceivedCryptoFunds',
  TransferComplete = 'TransferComplete',
  TransferFailed = 'TransferFailed',
}
export const transferStatusSchema = z.nativeEnum(TransferStatus, {
  description: 'transferStatusSchema',
})

/*
/ Transfer Endpoint Types
*/

export const transferRequestBodySchema = z.object(
  {
    fiatAccountId: fiatAccountIdSchema,
    quoteId: z.string(),
  },
  { description: 'transferRequestBodySchema' },
)
export type TransferRequestBody = z.infer<typeof transferRequestBodySchema>

export const transferResponseSchema = z.object(
  {
    transferId: z.string(),
    transferStatus: transferStatusSchema,
    transferAddress: z.string(),
  },
  { description: 'transferResponseSchema' },
)
export type TransferResponse = z.infer<typeof transferResponseSchema>

export const transferStatusRequestParamsSchema = z.object(
  {
    transferId: z.string(),
  },
  { description: 'transferStatusRequestParamsSchema' },
)
export type TransferStatusRequestParams = z.infer<
  typeof transferStatusRequestParamsSchema
>

export const transferStatusResponseSchema = z.object(
  {
    status: transferStatusSchema,
    transferType: transferTypeSchema,
    fiatType: fiatTypeSchema,
    cryptoType: cryptoTypeSchema,
    amountProvided: z.string(),
    amountReceived: z.string(),
    fee: z.string().optional(),
    fiatAccountId: fiatAccountIdSchema,
    transferId: z.string(),
    transferAddress: z.string(),
  },
  { description: 'transferStatusResponseSchema' },
)
export type TransferStatusResponse = z.infer<
  typeof transferStatusResponseSchema
>
