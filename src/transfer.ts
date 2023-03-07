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

// These enums are first segmented between transfers in and transfers out
// since they both allow a slightly different set of statuses.
// Transfer in statuses are further segmented, since once a transfer in
// progresses to sending the user funds, providers are expected
// to return new metadata about the transfer. This segmentation allows
// us to encode those semantics into Zod schemas.
export enum TransferInStatusPreTx {
  TransferStarted = TransferStatus.TransferStarted,
  TransferFiatFundsDebited = TransferStatus.TransferFiatFundsDebited,
  TransferReceivedFiatFunds = TransferStatus.TransferReceivedFiatFunds,
  TransferFailed = TransferStatus.TransferFailed,
}
export const transferInStatusPreTxSchema = z.nativeEnum(TransferInStatusPreTx, {
  description: 'transferInStatusPreTxSchema',
})

export enum TransferInStatusPostTx {
  TransferSendingCryptoFunds = TransferStatus.TransferSendingCryptoFunds,
  TransferComplete = TransferStatus.TransferComplete,
}
export const transferInStatusPostTxSchema = z.nativeEnum(
  TransferInStatusPostTx,
  {
    description: 'transferInStatusPostTxSchema',
  },
)

export enum TransferOutStatus {
  TransferStarted = TransferStatus.TransferStarted,
  TransferAmlFailed = TransferStatus.TransferAmlFailed,
  TransferReadyForUserToSendCryptoFunds = TransferStatus.TransferReadyForUserToSendCryptoFunds,
  TransferReceivedCryptoFunds = TransferStatus.TransferReceivedCryptoFunds,
  TransferComplete = TransferStatus.TransferComplete,
  TransferFailed = TransferStatus.TransferFailed,
}
export const transferOutStatusSchema = z.nativeEnum(TransferOutStatus, {
  description: 'transferOutStatusSchema',
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

const transferInStatusPreTxResponseSchema = z.object(
  {
    status: transferInStatusPreTxSchema,
    transferType: z.literal(TransferType.TransferIn),
    fiatType: fiatTypeSchema,
    cryptoType: cryptoTypeSchema,
    amountProvided: z.string(),
    amountReceived: z.string(),
    fee: z.string().optional(),
    fiatAccountId: fiatAccountIdSchema,
    transferId: z.string(),
    transferAddress: z.string(),
  },
  { description: 'transferInStatusPreTxResponseSchema' },
)
const transferInStatusPostTxResponseSchema = z.object(
  transferInStatusPreTxResponseSchema.extend({
    status: transferInStatusPostTxSchema,
    txHash: z.string(),
  }).shape,
  { description: 'transferInStatusPostTxResponseSchema' },
)
export const transferInStatusResponseSchema =
  transferInStatusPreTxResponseSchema.or(transferInStatusPostTxResponseSchema)

export const transferOutStatusResponseSchema = z.object(
  transferInStatusPreTxResponseSchema.extend({
    transferType: z.literal(TransferType.TransferOut),
    status: transferOutStatusSchema,
  }).shape,
  { description: 'transferOutStatusResponseSchema' },
)

export const transferStatusResponseSchema = transferInStatusResponseSchema.or(
  transferOutStatusResponseSchema,
)
export type TransferStatusResponse = z.infer<
  typeof transferStatusResponseSchema
>
