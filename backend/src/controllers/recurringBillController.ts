import { AppDataSource } from "../data-source";
import { RecurringBill } from "../entity/RecurringBill";
import { Party } from "../entity/Party";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllRecurringBills = createGetAll(AppDataSource, RecurringBill);
export const getRecurringBillByID = createGetById(AppDataSource, RecurringBill);
export const createRecurringBill = createPost(AppDataSource, RecurringBill);
export const updateRecurringBill = createUpdate(AppDataSource, RecurringBill, {
  party: Party,
});
export const deleteRecurringBill = createDelete(AppDataSource, RecurringBill);
