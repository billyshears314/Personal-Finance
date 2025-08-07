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

const TransactionsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );

  const { transactions, fetchTransactions, loading, error } = useAppStore(
    useShallow((state) => ({
      transactions: state.transactions,
      fetchTransactions: state.fetchTransactions,
      loading: state.loading,
      error: state.error,
    }))
  );

  // Debounce the fetchTransactions call itself
  const debouncedFetch = useCallback(
    debounce((page: number, search: string, categoryFilter: string) => {
      fetchTransactions({ page, search, categoryFilter: categoryFilter });
    }, 300),
    [fetchTransactions]
  );

  // Debounced fetch for search only
  const debouncedFetchBySearch = useCallback(
    debounce((searchValue: string) => {
      fetchTransactions({ page, search: searchValue, categoryFilter });
    }, 300),
    [fetchTransactions, page, categoryFilter]
  );

  // Trigger immediate fetch when page or categoryFilter changes
  useEffect(() => {
    fetchTransactions({ page, search, categoryFilter });
  }, [page, categoryFilter, fetchTransactions]);

  // Trigger debounced fetch when search changes
  useEffect(() => {
    debouncedFetchBySearch(search);
    return debouncedFetchBySearch.cancel;
  }, [search, debouncedFetchBySearch]);

  useEffect(() => {
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
        />
        {loading && transactions.length === 0 ? (
          <div>Loading</div>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}

        <div className="flex items-center w-full justify-center mt-4">
          <Pagination
            count={20}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={(e: any, page: number) => setPage(page)}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default TransactionsPage;
