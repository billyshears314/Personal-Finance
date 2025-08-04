import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Pot } from "../entity/Pot";

import {
  getAllPots,
  getPotByID,
  createPot,
  updatePot,
  deletePot,
} from "../controllers/potController";
import { validate } from "../middlewares/validate";
import {
  identifierSchema,
  updatePotBodySchema,
  createPotBodySchema,
} from "../schemas/potSchema";

const potsRouter = Router();

potsRouter.get("/", async (req: any, res: any) => {
  // get a pot repository to perform operations with pot
  const potRepository = await AppDataSource.getRepository(Pot);

  // create a real pot object from post json object sent over http
  const allPots = await potRepository.find();

  res.json(allPots);
});

potsRouter.get("/:id", async (req: any, res: any) => {
  // get a pot repository to perform operations with pot
  const potRepository = await AppDataSource.getRepository(Pot);

  // TODO: check request.params.id is number

  // create a real pot object from post json object sent over http
  const pot = await potRepository.findOneBy({ id: Number(req.params.id) });

  // if pot was not found return 404 to the client
  if (!pot) {
    res.status(404);
    res.end();
    return;
  }

  // return loaded pot
  res.send(pot);
});

// potsRouter.post("/", async (req: any, res: any) => {
//   console.log("POT SAVE");
//   // get a pot repository to perform operations with pot
//   const potRepository = await AppDataSource.getRepository(Pot);

//   // TODO: Validate request.body

//   // create a real pot object from pot json object sent over http
//   const newPot = potRepository.create(req.body);

//   // save received post
//   await potRepository.save(newPot);

//   // return saved post back
//   res.send(newPot);
// });

potsRouter.get("/", getAllPots);
potsRouter.get("/:id", validate(identifierSchema, "params"), getPotByID);
potsRouter.post("/", validate(createPotBodySchema), createPot);
// TODO: SHOULD VALIDATE PARAM AS WELL
potsRouter.put("/:id", validate(updatePotBodySchema), updatePot);
potsRouter.delete("/:id", validate(identifierSchema, "params"), deletePot);

export default potsRouter;
