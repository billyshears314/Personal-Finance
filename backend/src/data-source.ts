import { DataSource } from "typeorm";
import { Post } from "./entity/Post"; // adjust path accordingly
import { Category } from "./entity/Category"; // adjust path accordingly

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "testdb",
  synchronize: true,
  logging: false,
  entities: [Post, Category],
});
