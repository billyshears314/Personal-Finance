import PreviewCard from "./PreviewCard";
import TransactionAmount from "../../../components/TransactionAmount";
import { Transaction } from "@/types";
import { formatDate } from "@/utils/date";

interface TransactionsCardProps {
  transactions: Transaction[];
}

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow = ({ transaction }: TransactionRowProps) => {
  return (
    <tr className="h-[80px]" key={transaction.id}>
      <td className="w-10">
        <img
          src={transaction.party.iconUrl}
          width={40}
          className="rounded-full"
        />
      </td>
      <td className="font-bold pl-4">{transaction.party.name}</td>
      <td className="text-right">
        <div className="mb-1">
          <TransactionAmount amount={transaction.amount} />
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(transaction.date)}
        </div>
      </td>
    </tr>
  );
};

const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
  return (
    <PreviewCard
      title="Transactions"
      detailsLink="/transactions"
      detailsLinkText="View All"
    >
      <table className="w-full">
        <tbody className="divide-y">
          {transactions.map((transaction: Transaction) => {
            return (
              <TransactionRow transaction={transaction} key={transaction.id} />
            );
          })}
        </tbody>
      </table>
    </PreviewCard>
  );
};

export default TransactionsCard;
