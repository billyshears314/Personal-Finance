import React from "react";
import TransactionAmount from "../../../components/TransactionAmount";
import { Transaction } from "@/types";

interface TransactionsTableMobileProps {
  transactions: Transaction[];
}

interface RowProps {
  transaction: Transaction;
}

const Row: React.FC<RowProps> = ({ transaction }) => {
  return (
    <tr className="border-b h-16">
      <td className="p-4 font-bold">
        <div className="flex items-center">
          <img
            src={transaction.party.iconUrl}
            width={36}
            className="rounded-full mr-4"
          />
          <div>
            <div>{transaction.party.name}</div>
            <div className="text-gray-500 text-xs">
              {transaction.budget.name}
            </div>
          </div>
        </div>
      </td>
      <td className="text-right font-semibold">
        <div>
          <TransactionAmount amount={transaction.amount} />
        </div>
        <div className="text-gray-500 text-xs">{transaction.date}</div>
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
        {/* <thead>
          <tr className="border-b h-12">
            <th className="text-left font-normal text-gray-500 text-xs">
              Recipient / Sender
            </th>
            <th className="text-left font-normal text-gray-500 text-xs">
              Category
            </th>
            <th className="text-left font-normal text-gray-500 text-xs">
              Transaction Date
            </th>
            <th className="text-right font-normal text-gray-500 text-xs">
              Amount
            </th>
          </tr>
        </thead> */}
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
