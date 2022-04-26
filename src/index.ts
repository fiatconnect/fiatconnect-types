
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
/ Quote Endpoint Types
*/

// Query parameters for all /quote endpoints
export type QuoteRequestQuery = {
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
    [key:string]: string[]
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
    [key:string]: string[]
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

// Path parameters for POST /accounts/:fiatAccountSchema
export type AddFiatAccountRequestParams = {
  fiatAccountSchema: FiatAccountSchema
}

// Path parameters for DELETE /accounnt/:fiatAccountId
export type DeleteFiatAccountRequestParams = {
  fiatAccountId: FiatAccountId
}

// Response body for GET /accounts/:fiatAccountSchema
export type GetFiatAccountsResponse = Partial<Record<
  FiatAccountType,
  ObfuscatedFiatAccountData[]
  >>

// Response body for POST /accounts/:fiatAccountSchema
export type AddFiatAccountResponse = ObfuscatedFiatAccountData

// Helper type. Generic representation of a fiat account, with personal information stripped.
export type ObfuscatedFiatAccountData = {
  fiatAccountId: string
  accountName: string
  institutionName: string
  fiatAccountType: FiatAccountType
}

/*
/ Transfer Endpoint Types
*/

// Request body for POST /transfer/in and POST /transfer/out
export type TransferRequestBody = {
  fiatType: FiatType
  cryptoType: CryptoType
  amount: string
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
  TransferPending = 'TransferPending',
  TransferComplete = 'TransferComplete',
  TransferFailed = 'TransferFailed',
}

export enum KycStatus {
  NotCreated = 'NotCreated',
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
  Expired = 'Expired',
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

export type WebhookRequestBody = {
  eventType: WebhookEventType
  provider: string
  eventId: string
  accountAddress: string
}

export type WebhookKycStatusRequestBody = WebhookRequestBody & {
  payload: {
    kycSchema: KycSchema
    kycStatus: KycStatus
  }
}

export type WebhookTransferInStatusRequestBody = WebhookRequestBody & {
  payload: TransferStatusResponse
}

export type WebhookTransferOutStatusRequestBody =
  WebhookTransferInStatusRequestBody

// Errors returned by FiatConnect endpoints
export enum FiatConnectError {
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
  InvalidParameters = 'InvalidParameters',
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
  REAL = 'REAL',
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
  AccountNumber = 'AccountNumber'
}

export enum FiatAccountType {
  BankAccount = 'BankAccount'
}

export interface AccountNumber {
  accountName: string,
  institutionName: string,
  accountNumber: string,
  country: string,
  fiatAccountType: FiatAccountType.BankAccount
}

// https://github.com/fiatconnect/specification/blob/5929f7ea8ca99796608e89a9c8da4c1033dacf05/fiatconnect-api.md#728-personaldataanddocuments
export interface PersonalDataAndDocumentsKyc {
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
