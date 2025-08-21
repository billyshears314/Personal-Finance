import React from "react";
import { useShallow } from "zustand/shallow";
import { Donut } from "../../../components";
import { useAppStore } from "@/stores/useAppStore";
import { Budget } from "@/types";

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  return (
    <div className="flex py-4">
      <div
        className={`h-6 w-1 rounded-full`}
        style={{ background: budget.theme.color }}
      ></div>
      <div className="ml-4 text-gray-500">{budget.name}</div>
      <div className="flex ml-auto text-right">
        <div className="text-base lg:text-lg mr-2 font-bold text-gray-900">
          ${budget.spent.toFixed(2)}
        </div>
        <div className="text-sm lg:text-base text-gray-500 mt-0.5">
          of ${budget.max.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const SpendingSummaryWidget: React.FC = () => {
  const { budgets } = useAppStore(
    useShallow((state) => ({
      budgets: state.budgets,
      fetchBudgets: state.fetchBudgets,
      loading: state.loading,
      error: state.error,
    }))
  );

  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalMax = budgets.reduce((sum, budget) => sum + budget.max, 0);

  // useEffect(() => {
  //   fetchBudgets();
  // }, [fetchBudgets]);

  return (
    <div className="rounded-xl bg-white p-0 lg:p-4 md-only:flex">
      <div className="flex justify-center my-12 md-only:my-0 relative">
        <Donut amount={totalSpent} limit={totalMax} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-semibold mb-1 tracking-wide">
            ${totalSpent}
          </div>
          <div className="text-xs text-gray-500">of ${totalMax} limit</div>
        </div>
      </div>
      <div className="md-only:w-full">
        <div className="px-8 py-4">
          <h3 className="font-bold mb-4 text-lg">Spending Summary</h3>
          <div className="divide-y divide-gray-300">
            {budgets.map((budget) => {
              return <BudgetCard budget={budget} key={budget.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingSummaryWidget;
