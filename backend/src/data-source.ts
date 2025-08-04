import { DataSource } from "typeorm";
import { Pot } from "./entity/Pot"; // adjust path accordingly
import { Theme } from "./entity/Theme"; // adjust path accordingly

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mypassword",
  database: "testdb",
  synchronize: true,
  logging: false,
  entities: [Pot, Theme],
});
