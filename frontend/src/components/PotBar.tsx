import { Pot } from "@/types";
import Bar from "./Bar";

type BarType = "regular" | "add" | "withdraw";

interface PotBarProps {
  pot: Pot;
  valueChange?: number;
  type?: BarType;
}

const formatMoney = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const formatPercent = (percent: number) => {
  return `${percent.toFixed(2)}%`;
};

const calculatePercent = (amount: number, target: number) => {
  if (amount === undefined) return 0;
  return 100 * (amount / target);
};

const PotBar: React.FC<PotBarProps> = ({
  pot,
  valueChange,
  type = "regular",
}) => {
  let amount = pot.saved;
  if (valueChange) amount += valueChange;

  const originalPercentOfTarget = calculatePercent(pot.saved, pot.target);
  const percentOfTarget = calculatePercent(amount, pot.target);
  const percentOfValueChange = calculatePercent(valueChange, pot.target);

  return (
    <>
      <div className="flex items-center">
        <div className="text-base text-gray-500">
          {type === "regular" ? "Total Saved" : "New Amount"}
        </div>
        <div className="text-3xl text-gray-900 ml-auto font-bold">
          {formatMoney(amount)}
        </div>
      </div>
      <div className="my-4">
        <Bar
          color={pot?.theme?.color || "red"}
          value={originalPercentOfTarget}
          valueChange={percentOfValueChange}
          size="small"
          type={type}
        />
      </div>
      <div className="flex">
        <div className="text-sm text-gray-500">
          {formatPercent(percentOfTarget)}
        </div>
        <div className="text-sm text-gray-500 ml-auto">
          Target of {formatMoney(pot.target)}
        </div>
      </div>
    </>
  );
};

export default PotBar;
