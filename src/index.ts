/*
/ Types for request and response bodies.
/
/ Typings for requests are grouped into three categories, each following a common naming convention
/ that mimics the convention used by Express.
/   - Request Query Parameters: Typed as `xxxRequestQuery`
/   - Request Path Parameters: Typed as `xxxRequestParams`
/   - Request Body: Typed as `xxxRequestBody`
/
/ Typings for responses always correspond to the response body, and use a single naming convention.
/  - Response Body: Typed as `xxxResponse`
*/

/*
/ Clock Endpoint Types
*/

// Response body for GET /clock
export type ClockResponse = {
  time: string
}

/*
/ Auth Endpoint Types
*/

// Request body for /auth/login endpoint
export interface AuthRequestBody {
  message: string
  signature: string
}

/*
/ Quote Endpoint Types
*/

// Request body for all /quote endpoints
export type QuoteRequestBody = {
  fiatType: FiatType
  cryptoType: CryptoType
  fiatAmount?: string
  cryptoAmount?: string
  country: string
  region?: string
}

// Response body for all /quote endpoints
export type QuoteResponse = {
  quote: {
    fiatType: FiatType
    cryptoType: CryptoType
    fiatAmount: string
    cryptoAmount: string
    guaranteedUntil: string
    quoteId: string
    transferType: TransferType
  }
  kyc: {
    kycRequired: boolean
    kycSchemas: QuoteResponseKycSchema[]
  }
  fiatAccount: Partial<Record<FiatAccountType, FiatAccountTypeQuoteData>>
}

// Helper type
export type QuoteResponseKycSchema = {
  kycSchema: KycSchema
  allowedValues: {
    [key: string]: string[]
  }
}

export type QuoteErrorResponse = {
  error: FiatConnectError
  minimumFiatAmount?: string
  maximumFiatAmount?: string
  minimumCryptoAmount?: string
  maximumCryptoAmount?: string
}

// Helper type
export type FiatAccountTypeQuoteData = {
  fiatAccountSchemas: QuoteResponseFiatAccountSchema[]
  fee?: string
  feeType?: FeeType
  feeFrequency?: FeeFrequency
  settlementTimeLowerBound?: string // ISO-8601 Duration
  settlementTimeUpperBound?: string // ISO-8601 Duration
}

// Helper type
export type QuoteResponseFiatAccountSchema = {
  fiatAccountSchema: FiatAccountSchema
  allowedValues: {
    [key: string]: string[]
  }
}

/*
/ KYC Endpoint Types
*/

// Path parameters for all KYC endpoints
export type KycRequestParams = {
  kycSchema: KycSchema
}

// Response body for POST /kyc/:kycSchema and GET /kyc/:kycSchema/status
export type KycStatusResponse = {
  kycStatus: KycStatus
}

/*
/ Fiat Account Endpoint Types
*/

// Request body for POST /accounts/
export type PostFiatAccountRequestBody<T extends FiatAccountSchema> = {
  fiatAccountSchema: T
  data: FiatAccountSchemas[T]
}

// Path parameters for DELETE /accounts/:fiatAccountId
export type DeleteFiatAccountRequestParams = {
  fiatAccountId: FiatAccountId
}

// Response body for GET /accounts/
export type GetFiatAccountsResponse = Partial<
  Record<FiatAccountType, ObfuscatedFiatAccountData[]>
>

// Response body for POST /accounts/
export type PostFiatAccountResponse = ObfuscatedFiatAccountData

// Helper type. Generic representation of a fiat account, with personal information stripped.
export type ObfuscatedFiatAccountData = {
  fiatAccountId: string
  accountName: string
  institutionName: string
  fiatAccountType: FiatAccountType
  fiatAccountSchema: FiatAccountSchema
}

/*
/ Transfer Endpoint Types
*/

// Request body for POST /transfer/in and POST /transfer/out
export type TransferRequestBody = {
  fiatAccountId: string
  quoteId: string
}

// Response body for POST /transfer/in and POST /transfer/out
export type TransferResponse = {
  transferId: string
  transferStatus: TransferStatus
  transferAddress: string
}

// Path parameters for GET /transfer/:transferId/status
export type TransferStatusRequestParams = {
  transferId: string
}

// Response body for GET /transfer/:transferId/status
export type TransferStatusResponse = {
  status: TransferStatus
  transferType: TransferType
  fiatType: FiatType
  cryptoType: CryptoType
  amountProvided: string
  amountReceived: string
  fee?: string
  fiatAccountId: string
  transferId: string
  transferAddress: string
}

/*
 * FiatConnect static type definitions.
 */

export type FiatAccountId = string

export enum TransferType {
  TransferIn = 'TransferIn',
  TransferOut = 'TransferOut',
}

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

export enum KycStatus {
  KycNotCreated = 'KycNotCreated',
  KycPending = 'KycPending',
  KycApproved = 'KycApproved',
  KycDenied = 'KycDenied',
  KycExpired = 'KycExpired',
}

export enum FeeType {
  KycFee = 'KycFee',
  PlatformFee = 'PlatformFee',
}

export enum FeeFrequency {
  OneTime = 'OneTime',
  Recurring = 'Recurring',
}

// Types for request bodies sent from FiatConnect webhooks
export enum WebhookEventType {
  KycStatusEvent = 'KycStatusEvent',
  TransferInStatusEvent = 'TransferInStatusEvent',
  TransferOutStatusEvent = 'TransferOutStatusEvent',
}

type WebhookEventPayload = {
  [WebhookEventType.KycStatusEvent]: {
    kycSchema: KycSchema
    kycStatus: KycStatus
  }
  [WebhookEventType.TransferInStatusEvent]: TransferStatusResponse
  [WebhookEventType.TransferOutStatusEvent]: TransferStatusResponse
}

export type WebhookRequestBody<T extends WebhookEventType> = {
  eventType: T
  provider: string
  eventId: string
  timestamp: string
  address: string
  payload: WebhookEventPayload[T]
}

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

export enum Network {
  Alfajores = 'Alfajores',
  Mainnet = 'Mainnet',
}

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

export enum CryptoType {
  cUSD = 'cUSD',
  cEUR = 'cEUR',
  cREAL = 'cREAL',
  CELO = 'CELO',
}

export enum KycSchema {
  PersonalDataAndDocuments = 'PersonalDataAndDocuments',
}

export enum FiatAccountSchema {
  AccountNumber = 'AccountNumber',
  MobileMoney = 'MobileMoney',
  DuniaWallet = 'DuniaWallet',
  IBANNumber = 'IBANNumber',
  IFSCAccount = 'IFSCAccount',
}

export enum FiatAccountType {
  BankAccount = 'BankAccount',
  MobileMoney = 'MobileMoney',
  DuniaWallet = 'DuniaWallet',
}

interface RequiredFiatAccountSchemaFields {
  accountName: string
  institutionName: string
  fiatAccountType: FiatAccountType
}

type AccountNumber = RequiredFiatAccountSchemaFields & {
  accountNumber: string
  country: string
  fiatAccountType: FiatAccountType.BankAccount
}

type MobileMoney = RequiredFiatAccountSchemaFields & {
  mobile: string
  country: string
  operator: SupportedOperatorEnum
  fiatAccountType: FiatAccountType.MobileMoney
}

type DuniaWallet = RequiredFiatAccountSchemaFields & {
  mobile: string
  fiatAccountType: FiatAccountType.DuniaWallet
}

type IBANNumber = RequiredFiatAccountSchemaFields & {
  iban: string
  country: string
  fiatAccountType: FiatAccountType.BankAccount
}

type IFSCAccount = RequiredFiatAccountSchemaFields & {
  ifsc: string
  accountNumber: string
  country: string
  fiatAccountType: FiatAccountType.BankAccount
}

export enum SupportedOperatorEnum {
  ORANGE = 'ORANGE',
  MOOV = 'MOOV',
  MTN = 'MTN',
  WAVE = 'WAVE',
}

// Map of all supported fiat account schemas to the corresponding schema type. List must be manually updated
export type FiatAccountSchemas = {
  [FiatAccountSchema.AccountNumber]: AccountNumber
  [FiatAccountSchema.MobileMoney]: MobileMoney
  [FiatAccountSchema.DuniaWallet]: DuniaWallet
  [FiatAccountSchema.IBANNumber]: IBANNumber
  [FiatAccountSchema.IFSCAccount]: IFSCAccount
}

// https://github.com/fiatconnect/specification/blob/5929f7ea8ca99796608e89a9c8da4c1033dacf05/fiatconnect-api.md#728-personaldataanddocuments
interface PersonalDataAndDocumentsKyc {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: {
    day: string
    month: string
    year: string
  }
  address: {
    address1: string
    address2?: string
    isoCountryCode: string
    isoRegionCode: string
    city: string
    postalCode?: string
  }
  phoneNumber: string
  selfieDocument: string
  identificationDocument: string
}

// Map of all supported KYC schemas to the corresponding schema type. List must be manually updated
export type KycSchemas = {
  [KycSchema.PersonalDataAndDocuments]: PersonalDataAndDocumentsKyc
}
