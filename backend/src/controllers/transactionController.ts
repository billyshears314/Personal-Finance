import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Party } from "../entity/Party";
import { Budget } from "../entity/Budget";
import {
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";
import { Request, Response } from "express";

// export const getPaginatedTransactions = createGetAll(AppDataSource, Transaction);
export const getTransactionByID = createGetById(AppDataSource, Transaction);
export const createTransaction = createPost(AppDataSource, Transaction);
export const updateTransaction = createUpdate(AppDataSource, Transaction, {
  party: Party,
  budget: Budget,
});
export const deleteTransaction = createDelete(AppDataSource, Transaction);

export const getPaginatedTransactions = async (req: Request, res: Response) => {
  try {
    // Parse pagination params with defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || ""; // optional search string
    const budgetFilter = (req.query.budget as string) || "";
    const sort = (req.query.sort as string) || "";

    const transactionRepository = AppDataSource.getRepository(Transaction);

    const query = transactionRepository
      .createQueryBuilder("transaction")
      .leftJoinAndSelect("transaction.party", "party")
      .leftJoinAndSelect("transaction.budget", "budget");

    if (search) {
      query.andWhere("LOWER(party.name) LIKE :partySearch", {
        partySearch: `%${search.toLowerCase()}%`,
      });
    }

    if (budgetFilter) {
      query.andWhere("LOWER(budget.name) = :budgetName", {
        budgetName: budgetFilter.toLowerCase(),
      });
    }

    switch (sort) {
      case "latest":
        query.orderBy("transaction.date", "DESC");
        break;
      case "oldest":
        query.orderBy("transaction.date", "ASC");
        break;
      case "a_to_z":
        query.orderBy("party.name", "ASC");
        break;
      case "z_to_a":
        query.orderBy("party.name", "DESC");
        break;
      case "highest":
        query.orderBy("transaction.amount", "DESC");
        break;
      case "lowest":
        query.orderBy("transaction.amount", "ASC");
        break;
      default:
        query.orderBy("transaction.date", "DESC");
      // do nothing
    }

    const [transactions, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    res.json({
      data: transactions,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
