import { z } from 'zod'
import { fiatConnectErrorSchema } from './common'
import { fiatAccountSchemaSchema, fiatAccountTypeSchema } from './fiat-account'
import { kycSchemaSchema } from './kyc'
import { transferTypeSchema } from './transfer'

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

/*
/ Quote Endpoint Types
*/

export const quoteRequestBodySchema = z.object({
  fiatType: fiatTypeSchema,
  cryptoType: cryptoTypeSchema,
  address: z.string(),
  fiatAmount: z.string().optional(),
  cryptoAmount: z.string().optional(),
  country: z.string(),
  region: z.string().optional(),
})
export type QuoteRequestBody = z.infer<typeof quoteRequestBodySchema>

export const quoteErrorResponseSchema = z.object({
  error: fiatConnectErrorSchema,
  minimumFiatAmount: z.string().optional(),
  maximumFiatAmount: z.string().optional(),
  minimumCryptoAmount: z.string().optional(),
  maximumCryptoAmount: z.string().optional(),
})
export type QuoteErrorResponse = z.infer<typeof quoteErrorResponseSchema>

// Helper type
export const quoteResponseKycSchemaSchema = z.object({
  kycSchema: kycSchemaSchema,
  allowedValues: z.record(z.array(z.string())),
})
export type QuoteResponseKycSchema = z.infer<
  typeof quoteResponseKycSchemaSchema
>

// Helper type
export const quoteResponseFiatAccountSchemaSchema = z.object({
  fiatAccountSchema: fiatAccountSchemaSchema,
  allowedValues: z.record(z.array(z.string())),
})
export type QuoteResponseFiatAccountSchema = z.infer<
  typeof quoteResponseFiatAccountSchemaSchema
>

// Helper type
export const fiatAccountTypeQuoteDataSchema = z.object({
  fiatAccountSchemas: z.array(quoteResponseFiatAccountSchemaSchema),
  settlementTimeLowerBound: z.string().optional(), // ISO-8601 Duration
  settlementTimeUpperBound: z.string().optional(), // ISO-8601 Duration
})
export type FiatAccountTypeQuoteData = z.infer<
  typeof fiatAccountTypeQuoteDataSchema
>

export const quoteResponseSchema = z.object({
  quote: z.object({
    fiatType: fiatTypeSchema,
    cryptoType: cryptoTypeSchema,
    fiatAmount: z.string(),
    cryptoAmount: z.string(),
    guaranteedUntil: z.string(),
    quoteId: z.string(),
    transferType: transferTypeSchema,
    fee: z.string().optional(),
    feeType: feeTypeSchema.optional(),
    feeFrequency: feeFrequencySchema.optional(),
  }),
  kyc: z.object({
    kycRequired: z.boolean(),
    kycSchemas: z.array(quoteResponseKycSchemaSchema),
  }),
  fiatAccount: z.record(fiatAccountTypeSchema, fiatAccountTypeQuoteDataSchema),
})
export type QuoteResponse = z.infer<typeof quoteResponseSchema>
