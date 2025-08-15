"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import {
  BudgetsCard,
  PotsCard,
  RecurringBillsCard,
  TransactionsCard,
  MoneyCard,
} from "./home/components";

import ContentContainer from "@/components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";

const Home = () => {
  const balance = useAppStore((state) => state.balance);
  const income = useAppStore((state) => state.income);
  const expenses = useAppStore((state) => state.expenses);
  const { pots } = useAppStore(
    useShallow((state) => ({
      pots: state.pots,
    }))
  );

  const { transactions } = useAppStore(
    useShallow((state) => ({
      transactions: state.transactions,
    }))
  );

  const { budgets } = useAppStore(
    useShallow((state) => ({
      budgets: state.budgets,
    }))
  );

  // Only use up to 4 pots to display
  const topPots = pots.slice(0, 4);

  // Only use up to 5 transactions to display
  const topTransactions = transactions.slice(0, 5);

  // Only use up to 4 budgets to display
  const topBudgets = budgets.slice(0, 4);

  const fetchOverview = useAppStore((state) => state.fetchOverview);
  const totalSavedForPots = useAppStore((state) => state.getPotsTotalSaved());

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <ContentContainer title="Overview">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/3">
          <MoneyCard title="Current Balance" amount={balance} type="active" />
        </div>
        <div className="w-full md:w-1/3">
          <MoneyCard title="Income" amount={income} />
        </div>
        <div className="w-full md:w-1/3">
          <MoneyCard title="Expenses" amount={expenses} />
        </div>
      </div>
      <div className="lg:columns-2">
        <div className="mb-4">
          <PotsCard pots={topPots} totalSaved={totalSavedForPots} />
        </div>
        <div className="mb-4 lg:pb-20">
          <TransactionsCard transactions={topTransactions} />
        </div>
        <div className="mb-4">
          <BudgetsCard budgets={topBudgets} />
        </div>
        <div className="mb-4">
          <RecurringBillsCard />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Home;
