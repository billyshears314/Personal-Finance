import { DataSource } from "typeorm";
import { Pot } from "./entity/Pot";
import { Theme } from "./entity/Theme";
import { Party } from "./entity/Party";
import { Budget } from "./entity/Budget";
import { Transaction } from "./entity/Transaction";
import { RecurringBill } from "./entity/RecurringBill";

console.log(JSON.stringify(process.env, null, 2));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Pot, Theme, Party, Budget, Transaction, RecurringBill],
});
