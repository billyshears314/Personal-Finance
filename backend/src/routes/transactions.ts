import { Router } from "express";

import {
  getPaginatedTransactions,
  getTransactionByID,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";
import { validate } from "../middlewares/validate";
import { transactionSchema } from "../schemas/schema";

import { identifierSchema } from "../schemas/schema";

const transactionsRouter = Router();

transactionsRouter.get("/", getPaginatedTransactions);
transactionsRouter.get(
  "/:id",
  validate(identifierSchema, "params"),
  getTransactionByID
);
transactionsRouter.post("/", validate(transactionSchema), createTransaction);
// TODO: SHOULD VALIDATE PARAM AS WELL
transactionsRouter.put("/:id", validate(transactionSchema), updateTransaction);
transactionsRouter.delete(
  "/:id",
  validate(identifierSchema, "params"),
  deleteTransaction
);

export default transactionsRouter;
