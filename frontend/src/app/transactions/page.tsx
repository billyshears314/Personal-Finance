"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import Pagination from "@mui/material/Pagination";
import TransactionSearchBar from "./components/TransactionSearchBar";
import TransactionsTable from "./components/TransactionsTable";
import ContentContainer from "../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";
import { debounce } from "lodash";
import { PaginationMetaData } from "@/types";

const TransactionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log("PAGE RERENDER: TRANSACTIONS PAGE");

  const [paginationData, setPaginationData] = useState<PaginationMetaData>();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );

  const { budgets, fetchBudgets } = useAppStore(
    useShallow((state) => ({
      budgets: state.budgets,
      fetchBudgets: state.fetchBudgets,
    }))
  );

  const budgetNames = budgets.map((budget) => budget.name);

  const { transactions, fetchTransactions, loading } = useAppStore(
    useShallow((state) => ({
      transactions: state.transactions,
      fetchTransactions: state.fetchTransactions,
      loading: state.loading,
      error: state.error,
    }))
  );

  // Debounce the fetchTransactions call itself
  // const debouncedFetch = useCallback(
  //   debounce((page: number, search: string, categoryFilter: string) => {
  //     fetchTransactions({ page, search, categoryFilter: categoryFilter });
  //   }, 300),
  //   [fetchTransactions]
  // );

  // Debounced fetch for search only
  const debouncedFetchBySearch = useCallback(
    debounce((searchValue: string) => {
      fetchTransactions({ page, search: searchValue, categoryFilter });
    }, 300),
    [fetchTransactions, page, categoryFilter]
  );

  useEffect(() => {
    async function loadTransactions() {
      const result = (await fetchTransactions({
        page,
        search,
        categoryFilter,
      })) as PaginationMetaData;
      setPaginationData(result);
    }
    loadTransactions();
    fetchBudgets();
  }, []);

  // // Trigger immediate fetch when page or categoryFilter changes
  // useEffect(() => {
  //   fetchBudgets();
  // }, [fetchBudgets]);

  // // Trigger immediate fetch when page or categoryFilter changes
  // useEffect(() => {
  //   async function loadTransactions() {
  //     const result = (await fetchTransactions({
  //       page,
  //       search,
  //       categoryFilter,
  //     })) as PaginationMetaData;
  //     setPaginationData(result);
  //   }
  //   loadTransactions();
  // }, [page, categoryFilter, fetchTransactions]);

  // Trigger debounced fetch when search changes
  useEffect(() => {
    console.log("USE EFFECT C");
    debouncedFetchBySearch(search);
    return debouncedFetchBySearch.cancel;
  }, [search, debouncedFetchBySearch]);

  useEffect(() => {
    console.log("USE EFFECT D");
    updateUrlParams({ search, page, category: categoryFilter });
  }, [search, page, categoryFilter]);

  // TODO: Any way to simplify or separate any of this logic
  const updateUrlParams = (newParams: {
    search?: string;
    page?: number;
    category?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParams.search !== undefined) {
      if (newParams.search === "") {
        params.delete("search");
      } else {
        params.set("search", newParams.search);
      }
    }

    if (newParams.page !== undefined) {
      if (newParams.page === 1) {
        params.delete("page");
      } else {
        params.set("page", newParams.page.toString());
      }
    }

    if (newParams.category !== undefined) {
      if (newParams.category === "") {
        params.delete("category");
      } else {
        params.set("category", newParams.category);
      }
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <ContentContainer title="Transactions">
      <div className="bg-white p-6">
        <TransactionSearchBar
          onSearchChange={(search: string) => setSearch(search)}
          onCategoryFilterChange={(category: string) =>
            setCategoryFilter(category)
          }
          search={search}
          budgetNames={budgetNames}
        />
        {loading && transactions.length === 0 ? (
          <div>Loading</div>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}

        <div className="flex items-center w-full justify-center mt-4">
          <Pagination
            count={paginationData?.lastPage || 1}
            page={paginationData?.page || 1}
            variant="outlined"
            shape="rounded"
            onChange={(e: React.ChangeEvent, page: number) => setPage(page)}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default TransactionsPage;
