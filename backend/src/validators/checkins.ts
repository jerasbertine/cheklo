import { z } from "zod";

export const submitCheckinSchema = z.object({
  response: z.enum(["yes", "no", "mixed"]),
});

export type SubmitCheckinInput = z.infer<typeof submitCheckinSchema>
