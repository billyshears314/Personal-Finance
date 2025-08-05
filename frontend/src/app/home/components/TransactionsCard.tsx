import PreviewCard from "./PreviewCard";
import TransactionAmount from "../../../components/TransactionAmount";

const TransactionsCard = () => {
  const row = (
    entityName: string,
    entityImageSrc: string,
    amount: number,
    transactionDate: string
  ) => {
    return (
      <tr className="h-[67.5px]">
        <td className="w-10">
          <img
            src={`images/avatars/${entityImageSrc}`}
            width={40}
            className="rounded-full"
          />
        </td>
        <td className="font-bold pl-4">{entityName}</td>
        <td className="text-right">
          <div>
            <TransactionAmount amount={amount} />
          </div>
          <div className="text-sm text-gray-500">{transactionDate}</div>
        </td>
      </tr>
    );
  };

  return (
    <PreviewCard
      title="Transactions"
      detailsLink="/transactions"
      detailsLinkText="View All"
    >
      <table className="w-full">
        <tbody className="divide-y">
          {row("Emma Richardson", "emma-richardson.jpg", 75.5, "19 Aug 2024")}
          {row(
            "Savory Bites Bistro",
            "savory-bites-bistro.jpg",
            -55.5,
            "19 Aug 2024"
          )}
          {row("Daniel Carter", "daniel-carter.jpg", -42.3, "18 Aug 2024")}
          {row("Daniel Carter", "daniel-carter.jpg", -42.3, "18 Aug 2024")}
          {row("Daniel Carter", "daniel-carter.jpg", -42.3, "18 Aug 2024")}
        </tbody>
      </table>
    </PreviewCard>
  );
};

export default TransactionsCard;
