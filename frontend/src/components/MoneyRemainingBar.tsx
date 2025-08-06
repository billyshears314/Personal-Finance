import Bar from "./Bar";
import MoneyChunk from "./MoneyChunk";

interface MoneyRemainingBarProps {
  color: string;
  spent: number;
  max: number;
}

const MoneyRemainingBar: React.FC<MoneyRemainingBarProps> = ({
  color,
  spent,
  max,
}) => {
  return (
    <div>
      <div className="text-sm mb-2 text-gray-500">
        Maximum of ${max.toFixed(2)}
      </div>
      <Bar color={color} value={100 * (spent / max)} />
      <div className="flex mt-2">
        <div className="w-1/2">
          <MoneyChunk color={color} name="Spent" amount={spent} />
        </div>
        <div className="w-1/2">
          <MoneyChunk
            color="beige"
            name="Remaining"
            amount={max - spent > 0 ? max - spent : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default MoneyRemainingBar;
