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
  PIXAccount = 'PIXAccount'
}
export const fiatAccountSchemaSchema = z.nativeEnum(FiatAccountSchema, {
  description: 'fiatAccountSchemaSchema',
})

export enum FiatAccountType {
  BankAccount = 'BankAccount',
  MobileMoney = 'MobileMoney',
  DuniaWallet = 'DuniaWallet',
}
export const fiatAccountTypeSchema = z.nativeEnum(FiatAccountType, {
  description: 'fiatAccountTypeSchema',
})

export enum PIXKeyTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  CPF = 'CPF',
  RANDOM = 'RANDOM',
}
export const pixKeyTypeEnumSchema = z.nativeEnum(PIXKeyTypeEnum, {
  description: 'pixKeyTypeEnumSchema',
})

export enum SupportedOperatorEnum {
  ORANGE = 'ORANGE',
  MOOV = 'MOOV',
  MTN = 'MTN',
  WAVE = 'WAVE',
}
export const supportedOperatorEnumSchema = z.nativeEnum(SupportedOperatorEnum, {
  description: 'supportedOperatorEnumSchema',
})

export const pixKeySchema = z.object(
  {
    keyType: pixKeyTypeEnumSchema,
    key: z.string(),
    fiatAccountType: z.literal(FiatAccountType.BankAccount),
  },
  { description: 'pixKeySchema' },
)
export type PixKey = z.infer<typeof pixKeySchema>


const requiredFiatAccountSchemaFieldsSchema = z.object({
  accountName: z.string(),
  institutionName: z.string(),
  fiatAccountType: fiatAccountTypeSchema,
})

export const accountNumberSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object(
    {
      accountNumber: z.string(),
      country: z.string(),
      fiatAccountType: z.literal(FiatAccountType.BankAccount),
    },
    { description: 'accountNumberSchema' },
  ),
)
export type AccountNumber = z.infer<typeof accountNumberSchema>

export const duniaWalletSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object(
    {
      mobile: z.string(),
      fiatAccountType: z.literal(FiatAccountType.DuniaWallet),
    },
    { description: 'duniaWalletSchema' },
  ),
)
export type DuniaWallet = z.infer<typeof duniaWalletSchema>

export const mobileMoneySchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object(
    {
      mobile: z.string(),
      country: z.string(),
      operator: supportedOperatorEnumSchema,
      fiatAccountType: z.literal(FiatAccountType.MobileMoney),
    },
    { description: 'mobileMoneySchema' },
  ),
)
export type MobileMoney = z.infer<typeof mobileMoneySchema>

export const iBANNumberSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object(
    {
      iban: z.string(),
      country: z.string(),
      fiatAccountType: z.literal(FiatAccountType.BankAccount),
    },
    { description: 'iBANNumberSchema' },
  ),
)
export type IBANNumber = z.infer<typeof iBANNumberSchema>

export const iFSCAccountSchema = requiredFiatAccountSchemaFieldsSchema.and(
  z.object(
    {
      ifsc: z.string(),
      accountNumber: z.string(),
      country: z.string(),
      fiatAccountType: z.literal(FiatAccountType.BankAccount),
    },
    { description: 'iFSCAccountSchema' },
  ),
)
export type IFSCAccount = z.infer<typeof iFSCAccountSchema>

// Map of all supported fiat account schemas to the corresponding schema type. List must be manually updated
export const fiatAccountSchemasSchema = z.object(
  {
    [FiatAccountSchema.AccountNumber]: accountNumberSchema,
    [FiatAccountSchema.MobileMoney]: mobileMoneySchema,
    [FiatAccountSchema.DuniaWallet]: duniaWalletSchema,
    [FiatAccountSchema.IBANNumber]: iBANNumberSchema,
    [FiatAccountSchema.IFSCAccount]: iFSCAccountSchema,
    [FiatAccountSchema.PIXAccount]: pixKeySchema
  },
  { description: 'fiatAccountSchemasSchema' },
)
export type FiatAccountSchemas = z.infer<typeof fiatAccountSchemasSchema>

export const fiatAccountIdSchema = z.string({
  description: 'fiatAccountIdSchema',
})
export type FiatAccountId = z.infer<typeof fiatAccountIdSchema>

export const obfuscatedFiatAccountDataSchema = z.object(
  {
    fiatAccountId: fiatAccountIdSchema,
    accountName: z.string(),
    institutionName: z.string(),
    fiatAccountType: fiatAccountTypeSchema,
    fiatAccountSchema: fiatAccountSchemaSchema,
  },
  { description: 'obfuscatedFiatAccountDataSchema' },
)
export type ObfuscatedFiatAccountData = z.infer<
  typeof obfuscatedFiatAccountDataSchema
>

/*
/ Fiat Account Endpoint Types
*/

// must be manually updated with new schemas
export const postFiatAccountRequestBodySchema = z.union(
  [
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
  ],
  { description: 'postFiatAccountRequestBodySchema' },
)
export type PostFiatAccountRequestBody = z.infer<
  typeof postFiatAccountRequestBodySchema
>

export const deleteFiatAccountRequestParamsSchema = z.object(
  {
    fiatAccountId: fiatAccountIdSchema,
  },
  { description: 'deleteFiatAccountRequestParamsSchema' },
)
export type DeleteFiatAccountRequestParams = z.infer<
  typeof deleteFiatAccountRequestParamsSchema
>

export const getFiatAccountsResponseSchema = z.record(
  fiatAccountTypeSchema,
  z.array(obfuscatedFiatAccountDataSchema),
  { description: 'getFiatAccountsResponseSchema' },
)
export type GetFiatAccountsResponse = z.infer<
  typeof getFiatAccountsResponseSchema
>

export const postFiatAccountResponseSchema = obfuscatedFiatAccountDataSchema
export type PostFiatAccountResponse = z.infer<
  typeof postFiatAccountResponseSchema
>