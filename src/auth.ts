import { z } from 'zod'

/*
/ Auth Endpoint Types
*/

// Request body for /auth/login endpoint
export const authRequestBodySchema = z.object({
  message: z.string(),
  signature: z.string(),
})

export type AuthRequestBody = z.infer<typeof authRequestBodySchema>
