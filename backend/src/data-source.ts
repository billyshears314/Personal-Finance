import "dotenv/config";
import { DataSource } from "typeorm";
import { Pot } from "./entity/Pot";
import { Theme } from "./entity/Theme";
import { Party } from "./entity/Party";
import { Budget } from "./entity/Budget";
import { Transaction } from "./entity/Transaction";
import { RecurringBill } from "./entity/RecurringBill";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // host: "dpg-d2b530ruibrs73f9f95g-a",
  // port: 5432,
  // username: "personal_finance_admin",
  // password: "wZ0H24ZB2qfTfryMdv49lsghfWgdbOSa",
  // database: "personal_finance_prod",
  synchronize: false,
  logging: false,
  entities: [Pot, Theme, Party, Budget, Transaction, RecurringBill],
  migrations: ["src/migration/*.ts"],
});
