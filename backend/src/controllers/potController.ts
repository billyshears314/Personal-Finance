// import { Request, Response } from "express";
// import { AppDataSource } from "../data-source";
// import { Pot } from "../entity/Pot";

// export const getAllPots = async (req: Request, res: Response) => {
//   const potRepository = await AppDataSource.getRepository(Pot);
//   const allPots = await potRepository.find();
//   res.json(allPots);
// };

// export const getPotByID = async (req: Request, res: Response) => {
//   const potRepository = await AppDataSource.getRepository(Pot);
//   const pot = await potRepository.findOneBy({ id: Number(req.params.id) });
//   if (!pot) {
//     res.status(404);
//     res.end();
//     return;
//   }
//   res.send(pot);
// };

// export const createPot = async (req: Request, res: Response) => {
//   const potRepository = await AppDataSource.getRepository(Pot);
//   const newPot = potRepository.create(req.body);
//   await potRepository.save(newPot);
//   res.send(newPot);
// };

import { AppDataSource } from "../data-source";
import { Pot } from "../entity/Pot";
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
export const updatePot = createUpdate(AppDataSource, Pot);
export const deletePot = createDelete(AppDataSource, Pot);
