import axios from "axios";
import { create } from "zustand";
import {
  Pot,
  Budget,
  Transaction,
  RecurringBill,
  Theme,
  PaginationMetaData,
} from "@/types";

// const APIHost = process.env.API_URL;
const APIHost = "http://localhost:3001";

// TODO: Fix, this is odd
type PaginationMetaDataType = PaginationMetaData | null;

interface FetchTransactionsResult {
  data: Transaction[];
  meta: PaginationMetaData;
}

interface PaginationOptions {
  search?: string;
  page?: number;
  limit?: number;
  categoryFilter?: string;
}

export interface AppState {
  balance: number;
  income: number;
  expenses: number;
  budgets: Budget[];
  pots: Pot[];
  transactions: Transaction[];
  recurringBills: RecurringBill[];
  themes: Theme[];
  loading: boolean;
  error: string | null;
  fetchOverview: () => Promise<void>;
  fetchPots: () => Promise<void>;
  createPot: (newPot: Omit<Pot, "id">) => Promise<void>;
  fetchBudgets: () => Promise<void>;
  fetchTransactions: (
    paginationOptions: PaginationOptions
  ) => Promise<PaginationMetaDataType>;
  fetchRecurringBills: () => Promise<void>;
  fetchThemes: () => Promise<void>;
  depositMoneyToPot: (potId: number, amount: number) => Promise<void>;
  withdrawMoneyFromPot: (potId: number, amount: number) => Promise<void>;
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
  themes: [],
  loading: false,
  error: null,
  paginationData: null,
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

      const [pots, budgets, transactionsPaginationData, recurringBills] =
        await Promise.all([
          potRes.json(),
          budgetRes.json(),
          transactionRes.json(),
          recurringBillRes.json(),
        ]);

      // TODO: Kind of awkward
      const transactions = (
        transactionsPaginationData as FetchTransactionsResult
      ).data;

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
  createPot: async (newPot) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<Pot>(`${APIHost}/pots`, newPot);
      // Append the new pot to the existing array
      set((state) => ({
        pots: [...state.pots, response.data],
        loading: false,
      }));
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create pot";
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
  fetchTransactions: async ({
    search = "",
    page = 1,
    limit = 10,
    categoryFilter = "",
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<FetchTransactionsResult>(
        `${APIHost}/transactions`,
        { params: { search, page, limit, budget: categoryFilter } }
      );

      const results = response.data;

      set({ transactions: results.data, loading: false });
      return results.meta;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch transactions";
      set({ error: message, loading: false });
      return null;
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
  fetchThemes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Pot[]>(`${APIHost}/themes`);
      set({ themes: response.data, loading: false });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch themes";
      set({ error: message, loading: false });
    }
  },
  depositMoneyToPot: async (potId: number, amount: number) => {
    try {
      await axios.post(`${APIHost}/pots/${potId}/deposit`, { amount });
      await get().fetchPots();
    } catch (error) {
      console.error("Deposit failed:", error);
      throw error; // Re-throw so components can handle it too
    }
  },
  withdrawMoneyFromPot: async (potId: number, amount: number) => {
    try {
      await axios.post(`${APIHost}/pots/${potId}/withdraw`, { amount });
      await get().fetchPots();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      throw error;
    }
  },
}));
