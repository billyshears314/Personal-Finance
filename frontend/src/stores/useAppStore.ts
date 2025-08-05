import axios from "axios";
import { init } from "next/dist/compiled/webpack/webpack";
import { create } from "zustand";
import { Pot, Budget, Transaction, RecurringBill } from "@/types";

const APIHost = "http://localhost:3001";

export interface AppState {
  balance: number;
  income: number;
  expenses: number;
  budgets: Budget[];
  pots: Pot[];
  transactions: Transaction[];
  recurringBills: RecurringBill[];
  loading: boolean;
  error: string | null;
  fetchOverview: () => Promise<void>;
  fetchPots: () => Promise<void>;
  fetchBudgets: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  fetchRecurringBills: () => Promise<void>;
  getPotsTotalSaved: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  balance: 1000,
  income: 2000,
  expenses: 1700,
  budgets: [],
  pots: [],
  transactions: [],
  recurringBills: [],
  loading: false,
  error: null,
  getPotsTotalSaved: () => {
    const pots = get().pots;
    return pots.reduce((sum: number, pot: Pot) => sum + pot.saved, 0);
  },
  fetchOverview: async () => {
    set({ loading: true, error: null });
    try {
      const [potRes, budgetRes, transactionRes, recurringBillRes] =
        await Promise.all([
          fetch(`${APIHost}/pots`),
          fetch(`${APIHost}/budgets`),
          fetch(`${APIHost}/transactions`),
          fetch(`${APIHost}/recurringBills`),
        ]);

      if (!potRes.ok || !budgetRes.ok || !transactionRes || !recurringBillRes) {
        throw new Error("Failed to fetch one or more resources");
      }

      const [pots, budgets, transactions, recurringBills] = await Promise.all([
        potRes.json(),
        budgetRes.json(),
        transactionRes.json(),
        recurringBillRes.json(),
      ]);

      set({ pots, budgets, transactions, recurringBills, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unknown error", loading: false });
    }
  },
  fetchPots: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Pot[]>(`${APIHost}/pots`);
      set({ pots: response.data, loading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch pots";
      set({ error: message, loading: false });
    }
  },
  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Budget[]>(`${APIHost}/budgets`);
      set({ budgets: response.data, loading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch budgets";
      set({ error: message, loading: false });
    }
  },
  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Transaction[]>(
        `${APIHost}/transactions`
      );
      set({ transactions: response.data, loading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch transactions";
      set({ error: message, loading: false });
    }
  },
  fetchRecurringBills: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<RecurringBill[]>(
        `${APIHost}/recurringBills`
      );
      set({ recurringBills: response.data, loading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch recurring bills";
      set({ error: message, loading: false });
    }
  },
}));
