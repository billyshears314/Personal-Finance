import React, { Suspense } from "react";
import ClientTransactions from "./components/ClientTransactions";

const TransactionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientTransactions />
    </Suspense>
  );
};

export default TransactionsPage;
