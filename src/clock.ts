import { z } from 'zod'

/*
/ Clock Endpoint Types
*/

// Response body for GET /clock
export const clockResponseSchema = z.object(
  {
    time: z.string(),
  },
  { description: 'clockResponseSchema' },
)

export type ClockResponse = z.infer<typeof clockResponseSchema>
