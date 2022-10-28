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

import {
  FiatAccountSchema,
  FiatAccountType,
  SupportedOperatorEnum,
} from './fiat-account'
import { KycSchema, KycStatus } from './kyc'
import { FiatType, CryptoType } from './quote'
import { TransferStatus, TransferType } from './transfer'
import { WebhookEventType } from './webhook'

export * from './clock'
export * from './auth'
export * from './common'
export * from './fiat-account'
export * from './kyc'
export * from './quote'
export * from './transfer'
export * from './webhook'

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
