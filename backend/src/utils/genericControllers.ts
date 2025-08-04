import { Request, Response } from "express";
import { DataSource, EntityTarget, Repository } from "typeorm";

export function createGetAll<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>
) {
  return async (req: Request, res: Response) => {
    const repository: Repository<T> = dataSource.getRepository(entity);
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

export function createPost<T>(dataSource: DataSource, entity: EntityTarget<T>) {
  return async (req: Request, res: Response) => {
    const repository: Repository<T> = dataSource.getRepository(entity);
    const newItem = repository.create(req.body);
    await repository.save(newItem);
    res.status(201).json(newItem);
  };
}

// PUT (update)
export function createUpdate<T extends { id: number }>(
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

    const updated = repository.merge(existing, req.body);
    await repository.save(updated);
    res.json(updated);
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
