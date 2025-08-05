import PreviewCard from "./PreviewCard";
import { MoneyBar } from "../../../components";

const RecurringBillsCard = () => {
  return (
    <PreviewCard title="Recurring Bills" detailsLink="/recurringBills">
      <div className="flex flex-col gap-4">
        <MoneyBar color="green" name="Paid Bills" amount={190.0} />
        <MoneyBar color="yellow" name="Total Upcoming" amount={194.98} />
        <MoneyBar color="cyan" name="Due Soon" amount={59.98} />
      </div>
    </PreviewCard>
  );
};

export default RecurringBillsCard;
