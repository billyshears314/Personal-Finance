import { AppDataSource } from "../data-source";
import { Pot } from "../entity/Pot";
import { Theme } from "../entity/Theme";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllPots = createGetAll(AppDataSource, Pot);
export const getPotByID = createGetById(AppDataSource, Pot);
export const createPot = createPost(AppDataSource, Pot);
export const updatePot = createUpdate(AppDataSource, Pot, { theme: Theme });
export const deletePot = createDelete(AppDataSource, Pot);
