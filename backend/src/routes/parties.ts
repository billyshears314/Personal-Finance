import { Router } from "express";

import {
  getAllParties,
  getPartyByID,
  createParty,
  updateParty,
  deleteParty,
} from "../controllers/partyController";
import { validate } from "../middlewares/validate";
import { partySchema } from "../schemas/schema";

import { identifierSchema } from "../schemas/schema";

const partiesRouter = Router();

partiesRouter.get("/", getAllParties);
partiesRouter.get("/:id", validate(identifierSchema, "params"), getPartyByID);
partiesRouter.post("/", validate(partySchema), createParty);
// TODO: SHOULD VALIDATE PARAM AS WELL
partiesRouter.put("/:id", validate(partySchema), updateParty);
partiesRouter.delete("/:id", validate(identifierSchema, "params"), deleteParty);

export default partiesRouter;
