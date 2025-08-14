import TitleWithDot from "./TitleWithDot";
// import Bar from "./Bar";
// import MoneyChunk from "./MoneyChunk";
import LatestSpendingWidget from "./LatestSpendingWidget";
import MoneyRemainingBar from "./MoneyRemainingBar";

interface SpendingCardProps {
  spent: number;
  max: number;
  color: string;
}

const SpendingCard: React.FC<SpendingCardProps> = ({ spent, max, color }) => {
  return (
    <div className="p-8 rounded-xl bg-white">
      <div className="flex items-center mb-4">
        <TitleWithDot title="Entertainment" color={color} />
        <div className="ml-auto">
          <img src="images/icon-ellipsis.svg" />
        </div>
      </div>
      {/* <Bar value={20.0} /> */}
      {/* <MoneyChunk color="green" name="Spent" amount={15.0} /> */}
      <MoneyRemainingBar color={color} spent={spent} max={max} />
      <div className="mt-4">
        <LatestSpendingWidget />
      </div>
    </div>
  );
};

export default SpendingCard;
