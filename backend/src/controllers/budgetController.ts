import { AppDataSource } from "../data-source";
import { Budget } from "../entity/Budget";
import { Theme } from "../entity/Theme";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllBudgets = createGetAll(AppDataSource, Budget);
export const getBudgetByID = createGetById(AppDataSource, Budget);
export const createBudget = createPost(AppDataSource, Budget);
export const updateBudget = createUpdate(AppDataSource, Budget, {
  theme: Theme,
});
export const deleteBudget = createDelete(AppDataSource, Budget);
