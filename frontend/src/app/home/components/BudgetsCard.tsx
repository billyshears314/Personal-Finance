import PreviewCard from "./PreviewCard";
import { Donut, MoneyChunk } from "../../../components";
import { Budget } from "@/types";

interface BudgetsCardProps {
  budgets: Budget[];
}

const BudgetsCard = ({ budgets }: BudgetsCardProps) => {
  return (
    <PreviewCard title="Budgets" detailsLink="/budgets">
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
        <div className="relative flex justify-center md:w-full">
          <Donut amount={338} limit={975} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-3xl font-semibold mb-1 tracking-wide">
              $338
            </div>
            <div className="text-xs text-gray-500">of $975 limit</div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap md:flex-col">
          {budgets.map((budget) => {
            return (
              <div
                className="w-1/2 p-2 md:w-full md:p-0 md:py-2"
                key={budget.id}
              >
                <MoneyChunk
                  color={budget.theme.color || "red"}
                  name={budget.name}
                  amount={budget.spent}
                />
              </div>
            );
          })}
        </div>
      </div>
    </PreviewCard>
  );
};

export default BudgetsCard;
