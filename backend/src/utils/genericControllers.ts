import { z } from "zod";

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
// export function createUpdate<T extends { id: number }>(
//   dataSource: DataSource,
//   entity: EntityTarget<T>
// ) {
//   return async (req: Request, res: Response) => {
//     const repository: Repository<T> = dataSource.getRepository(entity);
//     const id = Number(req.params.id);
//     const existing = await repository.findOneBy({ id } as any);
//     if (!existing) {
//       res.status(404).end();
//       return;
//     }

//     const updated = repository.merge(existing, req.body);
//     await repository.save(updated);
//     res.json(updated);
//   };
// }

// export function createUpdate<T extends { id: number }>(
//   dataSource: DataSource,
//   entity: EntityTarget<T>,
//   relationsToUpdate: (keyof T)[] = [] // optional list of relation names, e.g. ['theme']
// ) {
//   return async (req: Request, res: Response) => {
//     const repository: Repository<T> = dataSource.getRepository(entity);
//     const id = Number(req.params.id);

//     // Load entity with specified relations
//     const existing = await repository.findOne({
//       where: { id } as any,
//       relations: relationsToUpdate as string[],
//     });

//     if (!existing) {
//       res.status(404).end();
//       return;
//     }

//     // Extract fields for relations to update from req.body
//     // Separate relation fields and the rest
//     const relationFields = relationsToUpdate.reduce((acc, relation) => {
//       if (relation in req.body) {
//         acc[relation] = req.body[relation];
//         delete req.body[relation];
//       }
//       return acc;
//     }, {} as Partial<T>);

//     // Merge main entity fields
//     repository.merge(existing, req.body);

//     // Merge relation entities if provided
//     for (const relation of relationsToUpdate) {
//       const relatedData = relationFields[relation];
//       if (relatedData && existing[relation]) {
//         Object.assign(existing[relation], relatedData);
//       } else if (relatedData) {
//         // if no existing relation instance, assign new data object
//         existing[relation] = relatedData as any;
//       }
//     }

//     const saved = await repository.save(existing);
//     res.json(saved);
//   };
// }

// export function createUpdate<T extends { id: number }>(
//   dataSource: DataSource,
//   entity: EntityTarget<T>,
//   relationsToUpdate: (keyof T)[] = []
// ) {
//   return async (req: Request, res: Response) => {
//     const repository = dataSource.getRepository(entity);
//     const id = Number(req.params.id);

//     const existing = await repository.findOne({
//       where: { id } as any,
//       relations: relationsToUpdate as string[],
//     });

//     if (!existing) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     // Separate relation fields from the rest
//     const relationFields = relationsToUpdate.reduce((acc, relation) => {
//       if (relation in req.body) {
//         acc[relation] = req.body[relation];
//         delete req.body[relation];
//       }
//       return acc;
//     }, {} as Partial<Record<keyof T, any>>);

//     // Merge basic fields
//     repository.merge(existing, req.body);

//     // Handle each relation explicitly
//     for (const relation of relationsToUpdate) {
//       const relatedData = relationFields[relation];

//       if (relatedData?.id) {
//         const relatedRepository = dataSource.getRepository(
//           Reflect.getMetadata("design:type", existing, relation as string)
//         );
//         const relatedEntity = await relatedRepository.findOneBy({
//           id: relatedData.id,
//         });

//         if (!relatedEntity) {
//           return res
//             .status(400)
//             .json({
//               message: `Related entity '${String(relation)}' with id ${
//                 relatedData.id
//               } not found`,
//             });
//         }

//         (existing as any)[relation] = relatedEntity;
//       } else if (relatedData === null) {
//         // Allow unsetting the relation
//         (existing as any)[relation] = null;
//       }
//     }

//     const saved = await repository.save(existing);

//     // Reload with relations if needed in response
//     const updated = await repository.findOne({
//       where: { id },
//       relations: relationsToUpdate as string[],
//     });

//     res.json(updated);
//   };
// }

// export function createPut<T>(
//   dataSource: DataSource,
//   entity: EntityTarget<T>,
//   zParamsSchema: z.ZodSchema<any>,
//   zBodySchema: z.ZodSchema<any>,
//   relations: string[] = []
// ) {
//   return async (req: Request, res: Response) => {
//     try {
//       // Parse and validate the route parameters (e.g., ID) using Zod
//       const parsedParams = zParamsSchema.parse(req.params);

//       // Parse and validate the request body using Zod
//       const parsedBody = zBodySchema.parse(req.body);

//       // Get the repository for the given entity (e.g., Goal, User, etc.)
//       const repository: Repository<T> = dataSource.getRepository(entity);

//       // Attempt to find the existing record by ID, including any specified relations
//       const existing = await repository.findOne({
//         where: parsedParams,
//         relations,
//       });

//       // If not found, return 404 Not Found
//       if (!existing) {
//         return res.status(404).json({ message: "Not found" });
//       }

//       // Merge the updated fields into the existing object
//       const merged = repository.merge(existing, parsedBody);

//       // Save the merged object to the database
//       const saved = await repository.save(merged);

//       // Return the saved object
//       return res.json(saved);
//     } catch (err) {
//       // Log the error for debugging purposes
//       console.error(err);

//       // Return a 400 Bad Request with the error message
//       return res.status(400).json({ message: "Invalid request", error: err });
//     }
//   };
// }

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
