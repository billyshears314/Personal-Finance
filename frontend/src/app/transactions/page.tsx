"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import Pagination from "@mui/material/Pagination";
import TransactionSearchBar from "./components/TransactionSearchBar";
import TransactionsTable from "./components/TransactionsTable";
import ContentContainer from "../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";
import { debounce } from "lodash";

const TransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
    debounce((page: number, search: string) => {
      fetchTransactions({ page, search });
    }, 300),
    [fetchTransactions]
  );

  // Trigger fetch when page or search changes
  useEffect(() => {
    debouncedFetch(page, search);
    return debouncedFetch.cancel; // Clean up on unmount/change
  }, [page, search, debouncedFetch]);

  return (
    <ContentContainer title="Transactions">
      <div className="bg-white p-6">
        <TransactionSearchBar
          onChange={(search: string) => setSearch(search)}
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
