import DetailsLink from "@/components/DetailsLink";
import { Transaction } from "@/types";

interface LatestSpendingRowProps {
  transaction: Transaction;
  // icon: string;
  // name: string;
  // amount: number;
  // date: string;
}

interface LatestSpendingWidgetProps {
  transactions: Transaction[];
}

const LatestSpendingWidget: React.FC<LatestSpendingWidgetProps> = ({
  transactions,
}) => {
  const LatestSpendingRow: React.FC<LatestSpendingRowProps> = ({
    transaction,
  }) => {
    return (
      <tr className="h-20">
        <td className="hidden md:table-cell align-middle w-[30px]">
          <div className="h-8 w-8">
            <img className="rounded-full" src={transaction?.party?.iconUrl} />
          </div>
        </td>
        <td>
          <div className="font-bold md:ml-4">{transaction?.party?.name}</div>
        </td>
        <td>
          <div className="text-right ml-auto">
            <div className="text-gray-900 font-bold">
              {transaction?.amount < 0
                ? `-$${Math.abs(transaction?.amount).toFixed(2)}`
                : `${transaction?.amount.toFixed(2)}`}
            </div>
            <div className="text-gray-500">{transaction?.date}</div>
          </div>
        </td>
      </tr>
    );
  };

  const LatestSpendingTable = () => (
    <table className="w-full">
      <tbody className="divide-y divide-gray-300">
        {transactions.map((transaction) => {
          return (
            <LatestSpendingRow transaction={transaction} key={transaction.id} />
          );
        })}
      </tbody>
    </table>
  );

  // <LatestSpendingRow transaction
  {
    /* <LatestSpendingRow
          icon="bytewise.jpg"
          name="Papa Software"
          amount={-10.0}
          date="16 Aug 2024"
        />
        <LatestSpendingRow
          icon="urban-services-hub.jpg"
          name="Quebec Services"
          amount={-5.0}
          date="12 Aug 2024"
        />
        <LatestSpendingRow
          icon="nimbus-data-storage.jpg"
          name="Romeo Cloud Service"
          amount={-10.0}
          date="30 Jul 2024"
        /> */
  }

  return (
    <div className="bg-beige-100 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="text-lg font-bold">Latest Spending</div>
        <div className="ml-auto">
          <DetailsLink
            text="See All"
            link="/transactions"
            query={{ category: transactions[0]?.budget?.name }}
          />
        </div>
        {/* TODO: Specify link for all transactions for that category */}
      </div>
      <LatestSpendingTable />
    </div>
  );
};

export default LatestSpendingWidget;
