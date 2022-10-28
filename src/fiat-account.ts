import { z } from 'zod'

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about differet fiat account types,
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new account type is added.
 *
 */

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
