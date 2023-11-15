import { z } from 'zod'
import {
  cryptoTypeSchema,
  fiatTypeSchema,
  userActionDetailsSchema,
} from './common'
import { fiatAccountIdSchema } from './fiat-account'

export enum TransferType {
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
}

export const transferTypeSchema = z.nativeEnum(TransferType, {
  description: 'transferTypeSchema',
})

export enum TransferStatus {
  TransferStarted = 'TransferStarted',
  TransferWaitingForUserAction = 'TransferWaitingForUserAction',
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

// Transfer status schemas are first segmented between transfers in and transfers out
// since they both allow a slightly different set of statuses.
// Transfer in statuses are further segmented, since once a transfer in
// progresses to sending the user funds, providers are expected
// to return new metadata about the transfer. This segmentation allows
// us to encode those semantics into Zod schemas.

export const transferInStatusPreTxSchema = z.enum(
  [
    TransferStatus.TransferStarted,
    TransferStatus.TransferWaitingForUserAction,
    TransferStatus.TransferFiatFundsDebited,
    TransferStatus.TransferReceivedFiatFunds,
    TransferStatus.TransferFailed,
  ],
  {
    description: 'transferInStatusPreTxSchema',
  },
)

export const transferInStatusPostTxSchema = z.enum(
  [TransferStatus.TransferSendingCryptoFunds, TransferStatus.TransferComplete],
  {
    description: 'transferInStatusPostTxSchema',
  },
)

export const transferOutStatusSchema = z.enum(
  [
    TransferStatus.TransferStarted,
    TransferStatus.TransferAmlFailed,
    TransferStatus.TransferReadyForUserToSendCryptoFunds,
    TransferStatus.TransferReceivedCryptoFunds,
    TransferStatus.TransferComplete,
    TransferStatus.TransferFailed,
  ],
  {
    description: 'transferOutStatusSchema',
  },
)

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

export const transferOutResponseSchema = z.object(
  {
    transferId: z.string(),
    transferStatus: transferStatusSchema,
    transferAddress: z.string(),
  },
  { description: 'transferOutResponseSchema' },
)
export type TransferOutResponse = z.infer<typeof transferOutResponseSchema>

export const transferInResponseSchema = z.object(
  {
    transferId: z.string(),
    transferStatus: transferStatusSchema,
    transferAddress: z.string(),
    userActionDetails: userActionDetailsSchema.optional(),
  },
  { description: 'transferInResponseSchema' },
)
export type TransferInResponse = z.infer<typeof transferInResponseSchema>

export const transferResponseSchema = transferInResponseSchema.or(
  transferOutResponseSchema,
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
    userActionDetails: userActionDetailsSchema.optional(),
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
