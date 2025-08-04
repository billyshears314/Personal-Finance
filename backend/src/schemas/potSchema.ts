import { z } from "zod";

export const updatePotBodySchema = z.object({
  name: z.string().min(1),
  saved: z.number().min(0),
  target: z.number().min(0),
});

export const createPotBodySchema = z.object({
  name: z.string().min(1),
  saved: z.number().min(0),
  target: z.number().min(0),
});
