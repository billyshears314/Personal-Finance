import { z } from "zod";

export const identifierSchema = z.object({
  id: z.string().regex(/^\d+$/),
});
