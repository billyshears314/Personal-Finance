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

const APIHost = process.env.NEXT_PUBLIC_API_URL;

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
  sort?: string;
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
  updatePot: (id: number, updatedPot: Partial<Pot>) => Promise<void>;
  deletePot: (id: number) => Promise<void>;
  createBudget: (newBudget: Omit<Budget, "id">) => Promise<void>;
  updateBudget: (id: number, updatedBudget: Partial<Budget>) => Promise<void>;
  deleteBudget: (id: number) => Promise<void>;
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

function getErrorMessage(
  error: unknown,
  fallback = "An error occurred"
): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  } else if (error instanceof Error) {
    return error.message;
  }
  return fallback;
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
    return get().pots.reduce((sum: number, pot: Pot) => sum + pot.saved, 0);
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

      if (
        !potRes.ok ||
        !budgetRes.ok ||
        !transactionRes.ok ||
        !recurringBillRes.ok
      ) {
        throw new Error("Failed to fetch one or more resources");
      }

      const [pots, budgets, transactionsPaginationData, recurringBills] =
        await Promise.all([
          potRes.json(),
          budgetRes.json(),
          transactionRes.json(),
          recurringBillRes.json(),
        ]);

      const transactions = (
        transactionsPaginationData as FetchTransactionsResult
      ).data;

      set({ pots, budgets, transactions, recurringBills, loading: false });
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch overview"),
        loading: false,
      });
    }
  },

  fetchPots: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Pot[]>(`${APIHost}/pots`);
      set({ pots: response.data, loading: false });
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch pots"),
        loading: false,
      });
    }
  },

  createPot: async (newPot: Partial<Pot>) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<Pot>(`${APIHost}/pots`, newPot);
      set((state) => ({
        pots: [...state.pots, response.data],
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to create pot"),
        loading: false,
      });
    }
  },

  updatePot: async (id, updatedPot) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<Pot>(
        `${APIHost}/pots/${id}`,
        updatedPot
      );
      set((state) => ({
        pots: state.pots.map((pot) => (pot.id === id ? response.data : pot)),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to update pot"),
        loading: false,
      });
    }
  },

  deletePot: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${APIHost}/pots/${id}`);
      set((state) => ({
        pots: state.pots.filter((pot) => pot.id !== id),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to delete pot"),
        loading: false,
      });
    }
  },

  createBudget: async (newBudget) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<Budget>(
        `${APIHost}/budgets`,
        newBudget
      );
      set((state) => ({
        budgets: [...state.budgets, response.data],
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to create budget"),
        loading: false,
      });
    }
  },

  updateBudget: async (id, updatedBudget) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<Budget>(
        `${APIHost}/budgets/${id}`,
        updatedBudget
      );

      set((state) => ({
        budgets: state.budgets.map((budget) =>
          budget.id === id ? response.data : budget
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to update budget"),
        loading: false,
      });
    }
  },

  deleteBudget: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${APIHost}/budgets/${id}`);
      set((state) => ({
        budgets: state.budgets.filter((budget) => budget.id !== id),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to delete budget"),
        loading: false,
      });
    }
  },

  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Budget[]>(`${APIHost}/budgets`);
      set({ budgets: response.data, loading: false });
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch budgets"),
        loading: false,
      });
    }
  },

  fetchTransactions: async ({
    search = "",
    page = 1,
    limit = 10,
    categoryFilter = "",
    sort = "",
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<FetchTransactionsResult>(
        `${APIHost}/transactions`,
        {
          params: { search, page, limit, budget: categoryFilter, sort },
        }
      );

      set({ transactions: response.data.data, loading: false });
      return response.data.meta;
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch transactions"),
        loading: false,
      });
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
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch recurring bills"),
        loading: false,
      });
    }
  },

  fetchThemes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${APIHost}/themes`);
      set({ themes: response.data, loading: false });
    } catch (error: unknown) {
      set({
        error: getErrorMessage(error, "Failed to fetch themes"),
        loading: false,
      });
    }
  },

  depositMoneyToPot: async (potId: number, amount: number) => {
    try {
      await axios.post(`${APIHost}/pots/${potId}/deposit`, { amount });
      await get().fetchPots();
    } catch (error: unknown) {
      console.error("Deposit failed:", getErrorMessage(error));
      throw error;
    }
  },

  withdrawMoneyFromPot: async (potId: number, amount: number) => {
    try {
      await axios.post(`${APIHost}/pots/${potId}/withdraw`, { amount });
      await get().fetchPots();
    } catch (error: unknown) {
      console.error("Withdrawal failed:", getErrorMessage(error));
      throw error;
    }
  },
}));
