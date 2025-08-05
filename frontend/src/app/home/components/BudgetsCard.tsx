import PreviewCard from "./PreviewCard";
import { Donut, MoneyChunk } from "../../../components";

const BudgetsCard = () => {
  return (
    <PreviewCard title="Budgets" detailsLink="/budgets">
      <div className="flex gap-4">
        <div className="relative">
          <Donut amount={338} limit={975} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-semibold mb-1 tracking-wide">
              $338
            </div>
            <div className="text-xs text-gray-500">of $975 limit</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <MoneyChunk color="#82C9D7" name="Bills" amount={750.0} />
          <MoneyChunk color="#626070" name="Personal Care" amount={100.0} />
          <MoneyChunk color="#F2CDAC" name="Dining Out" amount={75.0} />
          <MoneyChunk color="#277C78" name="Entertainment" amount={50.0} />
        </div>
      </div>
    </PreviewCard>
  );
};

export default BudgetsCard;
