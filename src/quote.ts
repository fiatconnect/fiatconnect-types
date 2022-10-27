import { z } from 'zod'
import {
  cryptoTypeSchema,
  feeFrequencySchema,
  feeTypeSchema,
  fiatAccountSchemaSchema,
  fiatAccountTypeSchema,
  fiatConnectErrorSchema,
  fiatTypeSchema,
  kycSchemaSchema,
  transferTypeSchema,
} from './enums'

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
