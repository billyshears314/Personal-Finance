import React from "react";
import { Donut } from "../../../components";

interface SpendingSummaryItemProps {
  name: string;
  amount: number;
  limit: number;
  color: string;
}

const spendingSummaryData = [
  {
    name: "Entertainment",
    amount: 15,
    limit: 50,
    color: "green",
  },
  {
    name: "Bills",
    amount: 150,
    limit: 750,
    color: "cyan",
  },
  {
    name: "Dining Out",
    amount: 133,
    limit: 75,
    color: "yellow",
  },
  {
    name: "Personal Care",
    amount: 40,
    limit: 100,
    color: "navy",
  },
];

const SpendingSummaryItem: React.FC<SpendingSummaryItemProps> = ({
  name,
  amount,
  limit,
  color,
}) => {
  return (
    <div className="flex py-4">
      <div className={`h-6 w-1 rounded-full bg-category-${color}`}></div>
      <div className="ml-4 text-gray-500">{name}</div>
      <div className="flex ml-auto text-right">
        <div className="text-base lg:text-lg mr-2 font-bold text-gray-900">
          ${amount.toFixed(2)}
        </div>
        <div className="text-sm lg:text-base text-gray-500 mt-0.5">
          of ${limit.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const SpendingSummaryWidget: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-0 lg:p-4 md-only:flex">
      <div className="flex justify-center my-12 md-only:my-0 relative">
        <Donut amount={338} limit={975} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-semibold mb-1 tracking-wide">$338</div>
          <div className="text-xs text-gray-500">of $975 limit</div>
        </div>
      </div>
      <div className="md-only:w-full">
        <div className="px-8 py-4">
          <h3 className="font-bold mb-4 text-lg">Spending Summary</h3>
          <div className="divide-y divide-gray-300">
            {spendingSummaryData.map((item) => {
              return (
                <SpendingSummaryItem
                  key={item.name}
                  name={item.name}
                  amount={item.amount}
                  limit={item.limit}
                  color={item.color}
                />
              );
            })}
          </div>
          {/* <SpendingSummaryItem
            name="Entertainment"
            amount={15.0}
            limit={50.0}
            color="green"
          />
          <SpendingSummaryItem
            name="Bills"
            amount={150.0}
            limit={750.0}
            color="cyan"
          />
          <SpendingSummaryItem
            name="Dining Out"
            amount={133.0}
            limit={75.0}
            color="yellow"
          />
          <SpendingSummaryItem
            name="Personal Care"
            amount={40.0}
            limit={100.0}
            color="navy"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SpendingSummaryWidget;
