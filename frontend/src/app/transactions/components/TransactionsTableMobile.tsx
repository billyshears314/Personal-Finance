import React from "react";
import TransactionAmount from "../../../components/TransactionAmount";
import { Transaction } from "@/types";
import { formatDate } from "@/utils/date";

interface TransactionsTableMobileProps {
  transactions: Transaction[];
}

interface RowProps {
  transaction: Transaction;
}

const Row: React.FC<RowProps> = ({ transaction }) => {
  return (
    <tr className="border-b h-16">
      <td className="p-4">
        <div className="flex items-center">
          <img
            src={transaction.party.iconUrl}
            width={36}
            className="rounded-full mr-4"
          />
          <div>
            <div className="font-bold">{transaction.party.name}</div>
            <div className="text-gray-500 text-xs">
              {transaction.budget.name}
            </div>
          </div>
        </div>
      </td>
      <td className="text-right">
        <div className="font-bold">
          <TransactionAmount amount={transaction.amount} />
        </div>
        <div className="text-gray-500 text-xs">
          {formatDate(transaction.date)}
        </div>
      </td>
    </tr>
  );
};

const TransactionsTableMobile: React.FC<TransactionsTableMobileProps> = ({
  transactions,
}) => {
  return (
    <div className="table-container bg-white">
      <table className="w-full mt-4">
        <tbody className="divide-y">
          {transactions.length > 0 &&
            transactions.map((transaction) => {
              return <Row transaction={transaction} key={transaction.id} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTableMobile;
