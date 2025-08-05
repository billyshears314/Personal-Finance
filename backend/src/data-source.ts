import { DataSource } from "typeorm";
import { Pot } from "./entity/Pot";
import { Theme } from "./entity/Theme";
import { Party } from "./entity/Party";
import { Budget } from "./entity/Budget";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mypassword",
  database: "testdb",
  synchronize: true,
  logging: false,
  entities: [Pot, Theme, Party, Budget],
});
