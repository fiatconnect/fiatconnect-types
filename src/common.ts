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
  InvalidQuote = 'InvalidQuote',
}

export const fiatConnectErrorSchema = z.nativeEnum(FiatConnectError, {
  description: 'fiatConnectErrorSchema',
})

export enum Network {
  Alfajores = 'Alfajores',
  Mainnet = 'Mainnet',
}

export const networkSchema = z.nativeEnum(Network, {
  description: 'networkSchema',
})

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

export const fiatTypeSchema = z.nativeEnum(FiatType, {
  description: 'fiatTypeSchema',
})

export enum CryptoType {
  cUSD = 'cUSD',
  cEUR = 'cEUR',
  cREAL = 'cREAL',
  CELO = 'CELO',
}

export const cryptoTypeSchema = z.nativeEnum(CryptoType, {
  description: 'cryptoTypeSchema',
})
export const EMAIL_REGEX =
  /* eslint-disable-next-line no-useless-escape */ // For some reason, eslint thinks the escaped \[ and /] are useless. they are indeed useful.
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // credit to http://emailregex.com/

export enum TransferInUserActionDetails {
  PIXUserAction = 'PIXUserAction',
  IBANUserAction = 'IBANUserAction',
  PSEUserAction = 'PSEUserAction',
  URLUserAction = 'URLUserAction',
  AccountNumberUserAction = 'AccountNumberUserAction',
}

export const transferInUserActionDetailsSchema = z.nativeEnum(
  TransferInUserActionDetails,
  {
    description: 'transferInUserActionDetailsSchema',
  },
)

export const pixUserActionSchema = z.object(
  {
    userActionType: z.literal(TransferInUserActionDetails.PIXUserAction),
    pixString: z.string(),
  },
  { description: 'pixUserActionSchema' },
)
export const ibanUserActionSchema = z.object(
  {
    userActionType: z.literal(TransferInUserActionDetails.IBANUserAction),
    iban: z.string(),
    bic: z.string(),
  },
  { description: 'ibanUserActionSchema' },
)

// @deprecated - use URLUserAction instead
export const pseUserActionSchema = z.object(
  {
    userActionType: z.literal(TransferInUserActionDetails.PSEUserAction),
    url: z.string(),
  },
  { description: 'pseUserActionSchema' },
)

export const urlUserActionSchema = z.object(
  {
    userActionType: z.literal(TransferInUserActionDetails.URLUserAction),
    url: z.string(),
  },
  { description: 'urlUserActionSchema' },
)

export const accountNumberUserActionSchema = z.object(
  {
    userActionType: z.literal(
      TransferInUserActionDetails.AccountNumberUserAction,
    ),
    institutionName: z.string(),
    accountName: z.string(),
    accountNumber: z.string(),
    transactionReference: z.string().optional(),
    deadline: z.string().optional(),
  },
  { description: 'accountNumberUserActionSchema' },
)

export const userActionDetailsSchema = z.union([
  pixUserActionSchema,
  ibanUserActionSchema,
  pseUserActionSchema,
  urlUserActionSchema,
  accountNumberUserActionSchema,
])

export type UserActionDetails = z.infer<typeof userActionDetailsSchema>
