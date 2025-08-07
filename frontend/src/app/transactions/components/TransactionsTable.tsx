import React from "react";
import Searchbar from "../../../components/SearchBar";
import TransactionAmount from "../../../components/TransactionAmount";
import { Transaction } from "@/types";

interface TableProps {
  transactions: Transaction[];
}

interface RowProps {
  entityName: string;
  entityIcon: string;
  category: string;
  transactionDate: string;
  amount: number;
}

const Row: React.FC<RowProps> = ({
  entityName,
  entityIcon,
  category,
  transactionDate,
  amount,
}) => {
  return (
    <tr className="border-b h-16">
      <td className="p-4 font-bold">
        <div className="flex items-center">
          <img src={entityIcon} width={36} className="rounded-full mr-4" />
          <span>{entityName}</span>
        </div>
      </td>
      <td className="text-gray-500 text-xs">{category}</td>
      <td className="text-gray-500 text-xs">{transactionDate}</td>
      <td className="text-right font-semibold">
        <TransactionAmount amount={amount} />
      </td>
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ transactions }) => {
  return (
    <div className="table-container bg-white">
      <table className="w-full mt-4">
        <thead>
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
        </thead>
        <tbody className="divide-y">
          {transactions.map((transaction) => {
            return (
              <Row
                entityName={transaction.party.name}
                entityIcon={transaction.party.iconUrl}
                category={transaction.budget.name}
                transactionDate={transaction.date}
                amount={transaction.amount}
                key={transaction.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
