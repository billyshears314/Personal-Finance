import { AppDataSource } from "../data-source";
import { Transaction } from "../entity/Transaction";
import { Party } from "../entity/Party";
import { Budget } from "../entity/Budget";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllTransactions = createGetAll(AppDataSource, Transaction);
export const getTransactionByID = createGetById(AppDataSource, Transaction);
export const createTransaction = createPost(AppDataSource, Transaction);
export const updateTransaction = createUpdate(AppDataSource, Transaction, {
  party: Party,
  budget: Budget,
});
export const deleteTransaction = createDelete(AppDataSource, Transaction);
