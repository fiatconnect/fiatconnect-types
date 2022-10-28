import { z } from 'zod'

export enum KycStatus {
  KycNotCreated = 'KycNotCreated',
  KycPending = 'KycPending',
  KycApproved = 'KycApproved',
  KycDenied = 'KycDenied',
  KycExpired = 'KycExpired',
}
export const kycStatusSchema = z.nativeEnum(KycStatus)

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about differet KYC Schemas
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new schema is added.
 *
 */

export enum KycSchema {
  PersonalDataAndDocuments = 'PersonalDataAndDocuments',
}
export const kycSchemaSchema = z.nativeEnum(KycSchema)
