import { serializeWithBufferAndIndex } from "typeorm/driver/mongodb/bson.typings";
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

export const transactionSchema = z.object({
  party: z.object({
    id: z.number(),
  }),
  budget: z.object({
    id: z.number(),
  }),
  // TODO change to z.date()
  date: z.string(),
  amount: z.number(),
});

export const recurringBillSchema = z.object({
  party: z.object({
    id: z.number(),
  }),
  dueDate: z.string(),
  amount: z.number(),
});

export const themeSchema = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});
