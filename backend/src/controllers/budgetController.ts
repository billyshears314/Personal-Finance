import { AppDataSource } from "../data-source";
import { Budget } from "../entity/Budget";
import { Theme } from "../entity/Theme";
import {
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";
import { Request, Response } from "express";

export const getAllBudgets = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Budget);
  const allItems = await repository.find({
    order: {
      id: "ASC", // or "DESC" for newest first
    },
  });
  res.json(allItems);
};

export const getBudgetByID = createGetById(AppDataSource, Budget);
export const createBudget = createPost(AppDataSource, Budget);
export const updateBudget = createUpdate(AppDataSource, Budget, {
  theme: Theme,
});
export const deleteBudget = createDelete(AppDataSource, Budget);
