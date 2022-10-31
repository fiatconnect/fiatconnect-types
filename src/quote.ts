import { z } from 'zod'
import {
  cryptoTypeSchema,
  fiatConnectErrorSchema,
  fiatTypeSchema,
} from './common'
import { fiatAccountSchemaSchema, fiatAccountTypeSchema } from './fiat-account'
import { kycSchemaSchema } from './kyc'
import { transferTypeSchema } from './transfer'

export enum FeeType {
  KycFee = 'KycFee',
  PlatformFee = 'PlatformFee',
}
export const feeTypeSchema = z.nativeEnum(FeeType, {
  description: 'feeTypeSchema',
})

export enum FeeFrequency {
  OneTime = 'OneTime',
  Recurring = 'Recurring',
}
export const feeFrequencySchema = z.nativeEnum(FeeFrequency, {
  description: 'feeFrequencySchema',
})

/*
/ Quote Endpoint Types
*/

export const quoteRequestBodySchema = z.object(
  {
    fiatType: fiatTypeSchema,
    cryptoType: cryptoTypeSchema,
    address: z.string(),
    fiatAmount: z.string().optional(),
    cryptoAmount: z.string().optional(),
    country: z.string(),
    region: z.string().optional(),
  },
  { description: 'quoteRequestBodySchema' },
)
export type QuoteRequestBody = z.infer<typeof quoteRequestBodySchema>

export const quoteErrorResponseSchema = z.object(
  {
    error: fiatConnectErrorSchema,
    minimumFiatAmount: z.string().optional(),
    maximumFiatAmount: z.string().optional(),
    minimumCryptoAmount: z.string().optional(),
    maximumCryptoAmount: z.string().optional(),
  },
  { description: 'quoteErrorResponseSchema' },
)
export type QuoteErrorResponse = z.infer<typeof quoteErrorResponseSchema>

// Helper type
export const quoteResponseKycSchemaSchema = z.object(
  {
    kycSchema: kycSchemaSchema,
    allowedValues: z.record(z.array(z.string())),
  },
  { description: 'quoteResponseKycSchemaSchema' },
)
export type QuoteResponseKycSchema = z.infer<
  typeof quoteResponseKycSchemaSchema
>

// Helper type
export const quoteResponseFiatAccountSchemaSchema = z.object(
  {
    fiatAccountSchema: fiatAccountSchemaSchema,
    allowedValues: z.record(z.array(z.string())),
  },
  { description: 'quoteResponseFiatAccountSchemaSchema' },
)
export type QuoteResponseFiatAccountSchema = z.infer<
  typeof quoteResponseFiatAccountSchemaSchema
>

// Helper type
export const fiatAccountTypeQuoteDataSchema = z.object(
  {
    fiatAccountSchemas: z.array(quoteResponseFiatAccountSchemaSchema),
    settlementTimeLowerBound: z.string().optional(), // ISO-8601 Duration
    settlementTimeUpperBound: z.string().optional(), // ISO-8601 Duration
  },
  { description: 'fiatAccountTypeQuoteDataSchema' },
)
export type FiatAccountTypeQuoteData = z.infer<
  typeof fiatAccountTypeQuoteDataSchema
>

export const quoteResponseSchema = z.object(
  {
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
    fiatAccount: z.record(
      fiatAccountTypeSchema,
      fiatAccountTypeQuoteDataSchema,
    ),
  },
  { description: 'quoteResponseSchema' },
)
export type QuoteResponse = z.infer<typeof quoteResponseSchema>
