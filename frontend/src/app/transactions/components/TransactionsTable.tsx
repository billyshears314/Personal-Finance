import React from "react";
import TransactionsTableDesktop from "./TransactionsTableDesktop";
import TransactionsTableMobile from "./TransactionsTableMobile";
import { Transaction } from "@/types";

interface TableProps {
  transactions: Transaction[];
}

const Table: React.FC<TableProps> = ({ transactions }) => {
  return (
    <>
      <div className="block lg:hidden">
        <TransactionsTableMobile transactions={transactions} />
      </div>
      <div className="hidden lg:block">
        <TransactionsTableDesktop transactions={transactions} />
      </div>
    </>
  );
};

export default Table;
