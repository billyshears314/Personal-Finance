import { AppDataSource } from "../data-source";
import { Theme } from "../entity/Theme";
import {
  createGetAll,
  createGetById,
  createPost,
  createUpdate,
  createDelete,
} from "../utils/genericControllers";

export const getAllThemes = createGetAll(AppDataSource, Theme);
export const getThemeByID = createGetById(AppDataSource, Theme);
export const createTheme = createPost(AppDataSource, Theme);
export const updateTheme = createUpdate(AppDataSource, Theme);
export const deleteTheme = createDelete(AppDataSource, Theme);
