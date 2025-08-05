import { Router } from "express";

import {
  getAllBudgets,
  getBudgetByID,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController";
import { validate } from "../middlewares/validate";
import { budgetSchema } from "../schemas/schema";

import { identifierSchema } from "../schemas/schema";

const budgetsRouter = Router();

budgetsRouter.get("/", getAllBudgets);
budgetsRouter.get("/:id", validate(identifierSchema, "params"), getBudgetByID);
budgetsRouter.post("/", validate(budgetSchema), createBudget);
// TODO: SHOULD VALIDATE PARAM AS WELL
budgetsRouter.put("/:id", validate(budgetSchema), updateBudget);
budgetsRouter.delete(
  "/:id",
  validate(identifierSchema, "params"),
  deleteBudget
);

export default budgetsRouter;
