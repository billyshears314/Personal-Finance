import PreviewCard from "./PreviewCard";
import TransactionAmount from "../../../components/TransactionAmount";
import { Transaction } from "@/types";

interface TransactionsCardProps {
  transactions: Transaction[];
}

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow = ({ transaction }: TransactionRowProps) => {
  return (
    <tr className="h-[67.5px]" key={transaction.id}>
      <td className="w-10">
        <img
          src={transaction.party.iconUrl}
          width={40}
          className="rounded-full"
        />
      </td>
      <td className="font-bold pl-4">{transaction.party.name}</td>
      <td className="text-right">
        <div>
          <TransactionAmount amount={transaction.amount} />
        </div>
        <div className="text-sm text-gray-500">{transaction.date}</div>
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
            return <TransactionRow transaction={transaction} />;
          })}
        </tbody>
      </table>
    </PreviewCard>
  );
};

export default TransactionsCard;
