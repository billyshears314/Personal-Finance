import { Router } from "express";

import {
  getAllThemes,
  getThemeByID,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../controllers/themeController";
import { validate } from "../middlewares/validate";
import { themeSchema } from "../schemas/schema";

import { identifierSchema } from "../schemas/schema";

const themesRouter = Router();

themesRouter.get("/", getAllThemes);
themesRouter.get("/:id", validate(identifierSchema, "params"), getThemeByID);
themesRouter.post("/", validate(themeSchema), createTheme);
// TODO: SHOULD VALIDATE PARAM AS WELL
themesRouter.put("/:id", validate(themeSchema), updateTheme);
themesRouter.delete("/:id", validate(identifierSchema, "params"), deleteTheme);

export default themesRouter;
