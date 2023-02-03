import { z } from 'zod'
import { EMAIL_REGEX } from './common'

export enum KycStatus {
  KycNotCreated = 'KycNotCreated',
  KycPending = 'KycPending',
  KycApproved = 'KycApproved',
  KycDenied = 'KycDenied',
  KycExpired = 'KycExpired',
}

export const kycStatusSchema = z.nativeEnum(KycStatus, {
  description: 'kycStatusSchema',
})

/*
 * FiatConnect dynamic type definitions.
 *
 * The following types contain information about differet KYC Schemas
 * that are currently supported by payment providers. The types can be added to via a pull request to the FiatConnect
 * specification repo -- for example, when support for a new schema is added.
 *
 */

// When adding new schemas be sure to also update kycSchemasSchema
export enum KycSchema {
  PersonalDataAndDocuments = 'PersonalDataAndDocuments',
  PersonalDataAndDocumentsDetailed = 'PersonalDataAndDocumentsDetailed',
}

export const kycSchemaSchema = z.nativeEnum(KycSchema, {
  description: 'kycSchemaSchema',
})

export enum IdentificationDocumentType {
  IDC = 'IDC',
  PAS = 'PAS',
  DL = 'DL',
}

// need nonempty array types to get zod enums to compile
const documentsWithBack: [
  IdentificationDocumentType,
  ...IdentificationDocumentType[],
] = [IdentificationDocumentType.IDC, IdentificationDocumentType.DL]
const documentsWithoutBack: [
  IdentificationDocumentType,
  ...IdentificationDocumentType[],
] = (
  Object.keys(IdentificationDocumentType) as [
    IdentificationDocumentType,
    ...IdentificationDocumentType[],
  ]
).filter((idType) => !documentsWithBack.includes(idType)) as [
  IdentificationDocumentType,
  ...IdentificationDocumentType[],
]

const identificationDocumentTypeWithBackSchema = z.enum(documentsWithBack)
const identificationDocumentTypeWithoutBackSchema = z.enum(documentsWithoutBack)
export const identificationDocumentTypeSchema =
  identificationDocumentTypeWithBackSchema.or(
    identificationDocumentTypeWithoutBackSchema,
  )

export const personalDataAndDocumentsKycSchema = z.object(
  {
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    dateOfBirth: z.object({
      day: z.string(),
      month: z.string(),
      year: z.string(),
    }),
    address: z.object({
      address1: z.string(),
      address2: z.string().optional(),
      isoCountryCode: z.string(),
      isoRegionCode: z.string(),
      city: z.string(),
      postalCode: z.string().optional(),
    }),
    phoneNumber: z.string(),
    selfieDocument: z.string(),
    identificationDocument: z.string(),
  },
  { description: 'personalDataAndDocumentsKycSchema' },
)
export type PersonalDataAndDocumentsKyc = z.infer<
  typeof personalDataAndDocumentsKycSchema
>

export const personalDataAndDocumentsDetailedKycSchema =
  personalDataAndDocumentsKycSchema
    .omit({ identificationDocument: true })
    .and(
      z.object({
        email: z.string().regex(EMAIL_REGEX),
        identificationDocumentFront: z.string(),
      }),
    )
    .and(
      z
        .object({
          identificationDocumentType: identificationDocumentTypeWithBackSchema,
          identificationDocumentBack: z.string(),
        })
        .or(
          z.object({
            identificationDocumentType:
              identificationDocumentTypeWithoutBackSchema,
          }),
        ),
    )

export type PersonalDataAndDocumentsDetailedKyc = z.infer<
  typeof personalDataAndDocumentsDetailedKycSchema
>

export const kycSchemasSchema = z.object(
  {
    [kycSchemaSchema.enum.PersonalDataAndDocuments]:
      personalDataAndDocumentsKycSchema,
    [kycSchemaSchema.enum.PersonalDataAndDocumentsDetailed]:
      personalDataAndDocumentsDetailedKycSchema,
  },
  { description: 'kycSchemasSchema' },
)
export type KycSchemas = z.infer<typeof kycSchemasSchema>

/*
/ KYC Endpoint Types
*/

// Path parameters for all KYC endpoints
export const kycRequestParamsSchema = z.object(
  {
    kycSchema: kycSchemaSchema,
  },
  { description: 'kycRequestParamsSchema' },
)
export type KycRequestParams = z.infer<typeof kycRequestParamsSchema>

// Response body for POST /kyc/:kycSchema and GET /kyc/:kycSchema/status
export const kycStatusResponseSchema = z.object(
  {
    kycStatus: kycStatusSchema,
  },
  { description: 'kycStatusResponseSchema' },
)
export type KycStatusResponse = z.infer<typeof kycStatusResponseSchema>
