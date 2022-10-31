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

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about currencies, tokens,
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new currency type is added.
 *
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
