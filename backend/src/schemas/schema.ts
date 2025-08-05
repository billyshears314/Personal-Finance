import { z } from "zod";

export const identifierSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

export const partySchema = z.object({
  name: z.string().min(1),
  iconUrl: z.string(),
});

export const potSchema = z.object({
  name: z.string().min(1),
  saved: z.number().min(0),
  target: z.number().min(0),
  theme: z.object({
    id: z.number(),
  }),
});

export const budgetSchema = z.object({
  name: z.string().min(1),
  spent: z.number().min(0),
  max: z.number().min(0),
  theme: z.object({
    id: z.number(),
  }),
});

export const themeSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
