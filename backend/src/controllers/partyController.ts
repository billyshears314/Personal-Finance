import { AppDataSource } from "../data-source";
import { Party } from "../entity/Party";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllParties = createGetAll(AppDataSource, Party);
export const getPartyByID = createGetById(AppDataSource, Party);
export const createParty = createPost(AppDataSource, Party);
export const updateParty = createUpdate(AppDataSource, Party);
export const deleteParty = createDelete(AppDataSource, Party);
