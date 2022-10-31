import { z } from 'zod'

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about different fiat account types,
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new account type is added.
 *
 */

// When adding new schemas remember to also update fiatAccountSchemasSchema and postFiatAccountRequestBodySchema
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

const requiredFiatAccountSchemaFieldsSchema = z.object({
  accountName: z.string(),
  institutionName: z.string(),
  fiatAccountType: fiatAccountTypeSchema,
})

export const accountNumberSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object({
    accountNumber: z.string(),
    country: z.string(),
    fiatAccountType: z.literal(FiatAccountType.BankAccount),
  }),
)
export type AccountNumber = z.infer<typeof accountNumberSchema>

export const duniaWalletSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object({
    mobile: z.string(),
    fiatAccountType: z.literal(FiatAccountType.DuniaWallet),
  }),
)
export type DuniaWallet = z.infer<typeof duniaWalletSchema>

export const mobileMoneySchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object({
    mobile: z.string(),
    country: z.string(),
    operator: supportedOperatorEnumSchema,
    fiatAccountType: z.literal(FiatAccountType.MobileMoney),
  }),
)
export type MobileMoney = z.infer<typeof mobileMoneySchema>

export const iBANNumberSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object({
    iban: z.string(),
    country: z.string(),
    fiatAccountType: z.literal(FiatAccountType.BankAccount),
  }),
)
export type IBANNumber = z.infer<typeof iBANNumberSchema>

export const iFSCAccountSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object({
    ifsc: z.string(),
    accountNumber: z.string(),
    country: z.string(),
    fiatAccountType: z.literal(FiatAccountType.BankAccount),
  }),
)
export type IFSCAccount = z.infer<typeof iFSCAccountSchema>

// Map of all supported fiat account schemas to the corresponding schema type. List must be manually updated
export const fiatAccountSchemasSchema = z.object({
  [FiatAccountSchema.AccountNumber]: accountNumberSchema,
  [FiatAccountSchema.MobileMoney]: mobileMoneySchema,
  [FiatAccountSchema.DuniaWallet]: duniaWalletSchema,
  [FiatAccountSchema.IBANNumber]: iBANNumberSchema,
  [FiatAccountSchema.IFSCAccount]: iFSCAccountSchema,
})
export type FiatAccountSchemas = z.infer<typeof fiatAccountSchemasSchema>

export const fiatAccountIdSchema = z.string()
export type FiatAccountId = z.infer<typeof fiatAccountIdSchema>

export const obfuscatedFiatAccountDataSchema = z.object({
  fiatAccountId: fiatAccountIdSchema,
  accountName: z.string(),
  institutionName: z.string(),
  fiatAccountType: fiatAccountTypeSchema,
  fiatAccountSchema: fiatAccountSchemaSchema,
})
export type ObfuscatedFiatAccountData = z.infer<
  typeof obfuscatedFiatAccountDataSchema
>

/*
/ Fiat Account Endpoint Types
*/

// must be manually updated with new schemas
export const postFiatAccountRequestBodySchema = z.union([
  z.object({
    fiatAccountSchema: z.literal(fiatAccountSchemaSchema.enum.AccountNumber),
    data: accountNumberSchema,
  }),
  z.object({
    fiatAccountSchema: z.literal(fiatAccountSchemaSchema.enum.DuniaWallet),
    data: duniaWalletSchema,
  }),
  z.object({
    fiatAccountSchema: z.literal(fiatAccountSchemaSchema.enum.MobileMoney),
    data: mobileMoneySchema,
  }),
  z.object({
    fiatAccountSchema: z.literal(fiatAccountSchemaSchema.enum.IBANNumber),
    data: iBANNumberSchema,
  }),
  z.object({
    fiatAccountSchema: z.literal(fiatAccountSchemaSchema.enum.IFSCAccount),
    data: iFSCAccountSchema,
  }),
])
export type PostFiatAccountRequestBody = z.infer<
  typeof postFiatAccountRequestBodySchema
>

export const deleteFiatAccountRequestParamsSchema = z.object({
  fiatAccountId: fiatAccountIdSchema,
})
export type DeleteFiatAccountRequestParams = z.infer<
  typeof deleteFiatAccountRequestParamsSchema
>

export const getFiatAccountsResponseSchema = z.record(
  fiatAccountTypeSchema,
  z.array(obfuscatedFiatAccountDataSchema),
)
export type GetFiatAccountsResponse = z.infer<
  typeof getFiatAccountsResponseSchema
>

export const postFiatAccountResponseSchema = obfuscatedFiatAccountDataSchema
export type PostFiatAccountResponse = z.infer<
  typeof postFiatAccountResponseSchema
>
