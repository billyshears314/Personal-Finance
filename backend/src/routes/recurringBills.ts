import { Router } from "express";

import {
  getAllRecurringBills,
  getRecurringBillByID,
  createRecurringBill,
  updateRecurringBill,
  deleteRecurringBill,
} from "../controllers/recurringBillController";
import { validate } from "../middlewares/validate";
import { recurringBillSchema } from "../schemas/schema";

import { identifierSchema } from "../schemas/schema";

const recurringBillsRouter = Router();

recurringBillsRouter.get("/", getAllRecurringBills);
recurringBillsRouter.get(
  "/:id",
  validate(identifierSchema, "params"),
  getRecurringBillByID
);
recurringBillsRouter.post(
  "/",
  validate(recurringBillSchema),
  createRecurringBill
);
// TODO: SHOULD VALIDATE PARAM AS WELL
recurringBillsRouter.put(
  "/:id",
  validate(recurringBillSchema),
  updateRecurringBill
);
recurringBillsRouter.delete(
  "/:id",
  validate(identifierSchema, "params"),
  deleteRecurringBill
);

export default recurringBillsRouter;
