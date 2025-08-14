import DetailsLink from "./DetailsLink";

interface LatestSpendingRowProps {
  icon: string;
  name: string;
  amount: number;
  date: string;
}

interface LatestSpendingWidgetProps {
  empty?: string; // just to satisfy error
}

const LatestSpendingWidget: React.FC<LatestSpendingWidgetProps> = ({}) => {
  const LatestSpendingRow: React.FC<LatestSpendingRowProps> = ({
    icon,
    name,
    amount,
    date,
  }) => {
    return (
      <tr className="h-16">
        <td className="w-8">
          <div className="h-8 w-8">
            <img className="rounded-full" src={`images/avatars/${icon}`} />
          </div>
        </td>
        <td>
          <div className="font-bold ml-4">{name}</div>
        </td>
        <td>
          <div className="text-right ml-auto">
            <div className="text-gray-900 font-bold">
              {amount < 0
                ? `-$${Math.abs(amount).toFixed(2)}`
                : `${amount.toFixed(2)}`}
            </div>
            <div className="text-gray-500">{date}</div>
          </div>
        </td>
      </tr>
    );
  };

  const LatestSpendingTable = () => (
    <table className="w-full">
      <tbody className="divide-y divide-gray-300">
        <LatestSpendingRow
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
        />
      </tbody>
    </table>
  );

  return (
    <div className="bg-beige-100 p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="text-lg font-bold">Latest Spending</div>
        <div className="ml-auto">
          <DetailsLink text="See All" link="/transactions" />
        </div>
        {/* TODO: Specify link for all transactions for that category */}
      </div>
      <LatestSpendingTable />
    </div>
  );
};

export default LatestSpendingWidget;
