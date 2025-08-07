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

    const transactionRepository = AppDataSource.getRepository(Transaction);

    // const [transactions, total] = await transactionRepository.findAndCount({
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   // order: {
    //   //   createdAt: "DESC", // Optional: sort by creation date
    //   // },
    // });

    // const query = transactionRepository
    //   .createQueryBuilder("transaction")
    //   .leftJoinAndSelect("transaction.party", "party")
    //   .leftJoinAndSelect("transaction.budget", "budget")
    //   .where("LOWER(party.name) LIKE :search", {
    //     search: `%${search.toLowerCase()}%`,
    //   })
    //   .skip((page - 1) * limit)
    //   .take(limit);
    // // .orderBy("transaction.date", "DESC");

    // const [transactions, total] = await query.getManyAndCount();

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

    const [transactions, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy("transaction.date", "DESC")
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
