import { z } from 'zod'

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
