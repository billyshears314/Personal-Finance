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
import { Request, Response } from "express";

export const getAllPots = createGetAll(AppDataSource, Pot);
export const getPotByID = createGetById(AppDataSource, Pot);
export const createPot = createPost(AppDataSource, Pot);
export const updatePot = createUpdate(AppDataSource, Pot, { theme: Theme });
export const deletePot = createDelete(AppDataSource, Pot);

export const depositMoneyToPot = async (req: Request, res: Response) => {
  const potId = parseInt(req.params.id);
  const amount = Number(req.body.amount || 1);

  const repository = AppDataSource.getRepository(Pot);

  try {
    const pot = await repository.findOne({ where: { id: potId } });

    if (!pot) {
      return res.status(404).json({ message: "Pot not found" });
    }

    pot.saved += amount;

    await repository.save(pot);

    res.status(200).json(pot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update pot" });
  }
};

export const withdrawMoneyFromPot = async (req: Request, res: Response) => {
  const potId = parseInt(req.params.id);
  const amount = Number(req.body.amount || 1);

  const repository = AppDataSource.getRepository(Pot);

  try {
    const pot = await repository.findOne({ where: { id: potId } });

    if (!pot) {
      return res.status(404).json({ message: "Pot not found" });
    }

    if (pot.saved < amount)
      return res.status(409).json({ message: "Insufficent Funds" });
    pot.saved -= amount;

    await repository.save(pot);

    res.status(200).json(pot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update pot" });
  }
};
