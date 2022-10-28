import { z } from 'zod'

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
