import { AppDataSource } from "../data-source";
import { Budget } from "../entity/Budget";
import { Theme } from "../entity/Theme";
import { Transaction } from "../entity/Transaction";
import {
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";
import { Request, Response } from "express";

// export const getAllBudgets = async (req: Request, res: Response) => {
//   const repository = AppDataSource.getRepository(Budget);
//   const allItems = await repository.find({
//     order: {
//       id: "ASC", // or "DESC" for newest first
//     },
//   });
//   res.json(allItems);
// };

// export const getAllBudgets = async (req: Request, res: Response) => {
//   const budgetRepo = AppDataSource.getRepository(Budget);

//   // Fetch all budgets first
//   const budgets = await budgetRepo.find({
//     order: { id: "ASC" },
//     relations: ["theme"], // include Theme eagerly
//   });

//   // Fetch last 3 transactions for each budget
//   const budgetWithTransactions = await Promise.all(
//     budgets.map(async (budget) => {
//       const transactions = await AppDataSource.getRepository(Transaction)
//         .createQueryBuilder("transaction")
//         .where("transaction.budgetId = :budgetId", { budgetId: budget.id })
//         .orderBy("transaction.id", "DESC")
//         .limit(3)
//         .getMany();

//       return {
//         ...budget,
//         transactions,
//       };
//     })
//   );

//   res.json(budgetWithTransactions);
// };

export const getAllBudgets = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(Budget);

  const budgets = await repository
    .createQueryBuilder("budget")
    .leftJoinAndSelect("budget.theme", "theme")
    .leftJoinAndSelect("budget.transactions", "transaction")
    .leftJoinAndSelect("transaction.budget", "transactionBudget") // if Transaction has ManyToOne back to Budget
    .leftJoinAndSelect("transaction.party", "party") // if you have Party relation
    // get only 3 latest transactions per budget
    .loadRelationCountAndMap("budget.transactionCount", "budget.transactions")
    .orderBy("budget.id", "ASC")
    .addOrderBy("transaction.id", "DESC")
    .getMany();

  // Slice transactions manually to only 3 latest
  budgets.forEach((budget) => {
    budget.transactions = budget.transactions.slice(0, 3);
  });

  res.json(budgets);
};

export const getBudgetByID = createGetById(AppDataSource, Budget);
export const createBudget = createPost(AppDataSource, Budget);
export const updateBudget = createUpdate(AppDataSource, Budget, {
  theme: Theme,
});
export const deleteBudget = createDelete(AppDataSource, Budget);
