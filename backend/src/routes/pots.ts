import { Router } from "express";

import {
  getAllPots,
  getPotByID,
  createPot,
  updatePot,
  deletePot,
} from "../controllers/potController";
import { validate } from "../middlewares/validate";
import { potSchema } from "../schemas/potSchema";

import { identifierSchema } from "../schemas/schema";

const potsRouter = Router();

potsRouter.get("/", getAllPots);
potsRouter.get("/:id", validate(identifierSchema, "params"), getPotByID);
potsRouter.post("/", validate(potSchema), createPot);
// TODO: SHOULD VALIDATE PARAM AS WELL
potsRouter.put("/:id", validate(potSchema), updatePot);
potsRouter.delete("/:id", validate(identifierSchema, "params"), deletePot);

export default potsRouter;
