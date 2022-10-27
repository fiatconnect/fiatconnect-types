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

export enum KycStatus {
  KycNotCreated = 'KycNotCreated',
  KycPending = 'KycPending',
  KycApproved = 'KycApproved',
  KycDenied = 'KycDenied',
  KycExpired = 'KycExpired',
}
export const kycStatusSchema = z.nativeEnum(KycStatus)

export enum FeeType {
  KycFee = 'KycFee',
  PlatformFee = 'PlatformFee',
}
export const feeTypeSchema = z.nativeEnum(FeeType)

export enum FeeFrequency {
  OneTime = 'OneTime',
  Recurring = 'Recurring',
}
export const feeFrequencySchema = z.nativeEnum(FeeFrequency)

export enum WebhookEventType {
  KycStatusEvent = 'WebhookKycStatusEvent',
  TransferInStatusEvent = 'WebhookTransferInStatusEvent',
  TransferOutStatusEvent = 'WebhookTransferOutStatusEvent',
}
export const webhookEventTypeSchema = z.nativeEnum(WebhookEventType)

// Errors returned by FiatConnect endpoints
export enum FiatConnectError {
  InvalidSignature = 'InvalidSignature',
  GeoNotSupported = 'GeoNotSupported',
  CryptoAmountTooLow = 'CryptoAmountTooLow',
  CryptoAmountTooHigh = 'CryptoAmountTooHigh',
  FiatAmountTooLow = 'FiatAmountTooLow',
  FiatAmountTooHigh = 'FiatAmountTooHigh',
  CryptoNotSupported = 'CryptoNotSupported',
  FiatNotSupported = 'FiatNotSupported',
  UnsupportedSchema = 'UnsupportedSchema',
  InvalidSchema = 'InvalidSchema',
  ResourceExists = 'ResourceExists',
  ResourceNotFound = 'ResourceNotFound',
  TransferNotAllowed = 'TransferNotAllowed',
  KycExpired = 'KycExpired',
  Unauthorized = 'Unauthorized',
  SessionExpired = 'SessionExpired',
  InvalidParameters = 'InvalidParameters',
  ContractLoginNotSupported = 'ContractLoginNotSupported',
  NonceInUse = 'NonceInUse',
  IssuedTooEarly = 'IssuedTooEarly',
  ExpirationTooLong = 'ExpirationTooLong',
  InvalidFiatAccount = 'InvalidFiatAccount',
}
export const fiatConnectErrorSchema = z.nativeEnum(FiatConnectError)

export enum Network {
  Alfajores = 'Alfajores',
  Mainnet = 'Mainnet',
}
export const networkSchema = z.nativeEnum(Network)

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about currencies, tokens, KYC information, and Fiat Account information
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new currency or account type is added.
 *
 * Any interfaces/enum values prefixed with `Mock` are not officially supported by the FiatConnect specification,
 * and are only included here as examples.
 */

export enum FiatType {
  USD = 'USD',
  EUR = 'EUR',
  BRL = 'BRL',
  GNF = 'GNF',
  INR = 'INR',
  NGN = 'NGN',
  GHS = 'GHS',
  KES = 'KES',
  ZAR = 'ZAR',
  PHP = 'PHP',
  UGX = 'UGX',
  GBP = 'GBP',
  XOF = 'XOF',
  RWF = 'RWF',
  CNY = 'CNY',
  XAF = 'XAF',
  ARS = 'ARS',
  BOB = 'BOB',
  CLP = 'CLP',
  COP = 'COP',
  FKP = 'FKP',
  GYD = 'GYD',
  PYG = 'PYG',
  PEN = 'PEN',
  SRD = 'SRD',
  UYU = 'UYU',
  VES = 'VES',
  MXN = 'MXN',
  PAB = 'PAB',
}
export const fiatTypeSchema = z.nativeEnum(FiatType)

export enum CryptoType {
  cUSD = 'cUSD',
  cEUR = 'cEUR',
  cREAL = 'cREAL',
  CELO = 'CELO',
}
export const cryptoTypeSchema = z.nativeEnum(CryptoType)

export enum KycSchema {
  PersonalDataAndDocuments = 'PersonalDataAndDocuments',
}
export const kycSchemaSchema = z.nativeEnum(KycSchema)

export enum FiatAccountSchema {
  AccountNumber = 'AccountNumber',
  MobileMoney = 'MobileMoney',
  DuniaWallet = 'DuniaWallet',
  IBANNumber = 'IBANNumber',
  IFSCAccount = 'IFSCAccount',
}
export const fiatAccountSchemaSchema = z.nativeEnum(FiatAccountSchema)

export enum FiatAccountType {
  BankAccount = 'BankAccount',
  MobileMoney = 'MobileMoney',
  DuniaWallet = 'DuniaWallet',
}
export const fiatAccountTypeSchema = z.nativeEnum(FiatAccountType)

export enum SupportedOperatorEnum {
  ORANGE = 'ORANGE',
  MOOV = 'MOOV',
  MTN = 'MTN',
  WAVE = 'WAVE',
}
export const supportedOperatorEnumSchema = z.nativeEnum(SupportedOperatorEnum)
