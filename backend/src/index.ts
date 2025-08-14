import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import potsRouter from "./routes/pots";
import themesRouter from "./routes/themes";
import partiesRouter from "./routes/parties";
import budgetsRouter from "./routes/budgets";
import transactionsRouter from "./routes/transactions";
import recurringBillsRouter from "./routes/recurringBills";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://personal-finance-f5x3.vercel.app/",
    ],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AppDataSource.initialize().then(async () => {
  const PORT = process.env.PORT || 3001;

  app.use(express.json());

  // Mount routes
  app.use("/pots", potsRouter);
  app.use("/themes", themesRouter);
  app.use("/parties", partiesRouter);
  app.use("/budgets", budgetsRouter);
  app.use("/transactions", transactionsRouter);
  app.use("/recurringBills", recurringBillsRouter);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
