"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import Button from "../../components/Button";
import Pagination from "@mui/material/Pagination";
import TransactionSearchBar from "./components/TransactionSearchBar";
import TransactionsTable from "./components/TransactionsTable";
import ContentContainer from "../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";

const TransactionsPage = () => {
  const { transactions, fetchTransactions, loading, error } = useAppStore(
    useShallow((state) => ({
      transactions: state.transactions,
      fetchTransactions: state.fetchTransactions,
      loading: state.loading,
      error: state.error,
    }))
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <ContentContainer title="Transactions">
      <div className="bg-white p-6">
        <TransactionSearchBar />
        {loading ? (
          <div>Loading</div>
        ) : (
          <TransactionsTable transactions={transactions} />
        )}

        <div className="flex items-center w-full justify-center mt-4">
          {/* <button className="py-1 px-4 rounded-lg bg-white border border-black">
              Prev
            </button> */}
          <Pagination count={5} variant="outlined" shape="rounded" />
          {/* <button className="py-1 px-4 rounded-lg bg-white border border-black">
              Next
            </button> */}
        </div>
      </div>
    </ContentContainer>
  );
};

export default TransactionsPage;
