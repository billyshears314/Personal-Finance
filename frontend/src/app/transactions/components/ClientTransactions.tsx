"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/shallow";
import Pagination from "@mui/material/Pagination";
import TransactionSearchBar from "./TransactionSearchBar";
import TransactionsTable from "./TransactionsTable";
import ContentContainer from "../../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";
import { debounce } from "lodash";
import { PaginationMetaData } from "@/types";

const ClientTransactions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("");
  const [paginationData, setPaginationData] = useState<PaginationMetaData>();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setPage(Number(searchParams.get("page")) || 1);
    setCategoryFilter(searchParams.get("category") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

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

  // Debounced fetch for search only
  const debouncedFetchBySearch = useCallback(
    debounce((searchValue: string) => {
      fetchTransactions({ page, search: searchValue, categoryFilter, sort });
    }, 300),
    [fetchTransactions, page, categoryFilter, sort]
  );

  useEffect(() => {
    async function loadTransactions() {
      const result = (await fetchTransactions({
        page,
        search,
        categoryFilter,
        sort,
      })) as PaginationMetaData;
      setPaginationData(result);
    }
    loadTransactions();
    fetchBudgets();
  }, []);

  // Trigger debounced fetch when search changes
  useEffect(() => {
    debouncedFetchBySearch(search);
    return debouncedFetchBySearch.cancel;
  }, [search, debouncedFetchBySearch]);

  useEffect(() => {
    const updateUrlParams = (newParams: {
      search?: string;
      page?: number;
      category?: string;
      sort?: string;
    }) => {
      const params = new URLSearchParams(window.location.search);

      // Update with current state
      if (newParams.search === "") {
        params.delete("search");
      } else {
        params.set("search", search);
      }

      if (newParams.page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }

      if (newParams.category === "") {
        params.delete("category");
      } else {
        params.set("category", categoryFilter);
      }

      if (newParams.sort === "") {
        params.delete("sort");
      } else {
        params.set("sort", sort);
      }

      router.push(`?${params.toString()}`);
    };

    updateUrlParams({ search, page, category: categoryFilter, sort });
  }, [search, page, categoryFilter, sort, router]);

  return (
    <ContentContainer title="Transactions">
      <div className="bg-white p-6">
        <TransactionSearchBar
          onSearchChange={(search: string) => setSearch(search)}
          onCategoryFilterChange={(category: string) =>
            setCategoryFilter(category)
          }
          onSortChange={(sort: string) => setSort(sort)}
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

export default ClientTransactions;
