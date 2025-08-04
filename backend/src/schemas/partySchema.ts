import { z } from "zod";

export const partySchema = z.object({
  name: z.string().min(1),
  iconUrl: z.string(),
});
