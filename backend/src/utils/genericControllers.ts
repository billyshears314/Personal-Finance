import { z } from "zod";

import { Request, Response } from "express";
import { DataSource, EntityTarget, Repository } from "typeorm";

export function createGetAll<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>
) {
  return async (req: Request, res: Response) => {
    // const repo = dataSource.getRepository(entity);
    // const all = await repo
    //   .createQueryBuilder("e")
    //   .orderBy("e.id", "DESC")
    //   .getMany();
    // res.json(all);
    const repository = dataSource.getRepository(entity);
    const allItems = await repository.find();
    res.json(allItems);
  };
}

export function createGetById<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>
) {
  return async (req: Request, res: Response) => {
    const repository: Repository<T> = dataSource.getRepository(entity);
    const item = await repository.findOneBy({
      id: Number(req.params.id),
    } as any);
    if (!item) {
      res.status(404).end();
      return;
    }
    res.json(item);
  };
}

type WithId = { id: number | string };

export function createPost<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
  relations: { [K in keyof T]?: EntityTarget<WithId> } = {}
) {
  return async (req: Request, res: Response) => {
    try {
      const repository: Repository<T> = dataSource.getRepository(entity);
      const data = req.body;

      // Create new entity instance
      const newItem = repository.create();

      // Assign properties and hydrate relations
      for (const key in data) {
        if (
          key in relations &&
          data[key] &&
          typeof data[key] === "object" &&
          "id" in data[key]
        ) {
          const relatedRepo = dataSource.getRepository(relations[key]!);
          const relatedEntity = await relatedRepo.findOneBy({
            id: data[key].id,
          } as any);

          if (!relatedEntity) {
            return res
              .status(400)
              .json({ message: `Related ${key} not found` });
          }

          (newItem as any)[key] = relatedEntity;
        } else {
          (newItem as any)[key] = data[key];
        }
      }

      // Save to DB
      const saved = await repository.save(newItem);

      // Reload with relations to return full objects
      const result = await repository.findOne({
        where: { id: (saved as any).id } as any,
        relations: Object.keys(relations) as string[],
      });

      return res.status(201).json(result ?? saved);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export function createUpdate<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
  relations: { [K in keyof T]?: EntityTarget<any> } = {}
) {
  return async (req: Request, res: Response) => {
    const repository = dataSource.getRepository(entity);
    const id = parseInt(req.params.id, 10);

    // Fetch the existing entity from the database
    let existing = await repository.findOne({ where: { id } as any });

    if (!existing) {
      return res.status(404).json({ message: "Entity not found" });
    }

    const data = req.body;

    // Loop through each key in the request body
    for (const key in data) {
      // If the key corresponds to a relation and the value is an object with an 'id'
      if (
        key in relations &&
        data[key] &&
        typeof data[key] === "object" &&
        "id" in data[key]
      ) {
        const relatedRepo = dataSource.getRepository(relations[key]!);

        // Find the full related entity (like Theme with all fields) from DB
        const relatedEntity = await relatedRepo.findOne({
          where: { id: data[key].id },
        });

        if (!relatedEntity) {
          return res.status(400).json({ message: `Related ${key} not found` });
        }

        // Assign the full related entity
        (existing as any)[key] = relatedEntity;
      } else {
        // Assign the primitive value directly
        (existing as any)[key] = data[key];
      }
    }

    // Save the updated entity back to the DB
    const saved = await repository.save(existing);
    return res.json(saved);
  };
}

// DELETE
export function createDelete<T extends { id: number }>(
  dataSource: DataSource,
  entity: EntityTarget<T>
) {
  return async (req: Request, res: Response) => {
    const repository: Repository<T> = dataSource.getRepository(entity);
    const id = Number(req.params.id);
    const existing = await repository.findOneBy({ id } as any);
    if (!existing) {
      res.status(404).end();
      return;
    }

    await repository.remove(existing);
    res.status(204).end();
  };
}
