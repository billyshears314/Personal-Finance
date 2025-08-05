interface MoneyBarProps {
  color: string;
  name: string;
  amount: number;
}

const MoneyBar: React.FC<MoneyBarProps> = ({ color, name, amount }) => {
  return (
    <div className="flex">
      <div className={`w-full pl-1 rounded bg-category-${color}`}>
        <div className="flex w-full bg-beige-100 rounded p-4">
          <div className="text-sm t text-gray-500">{name}</div>
          <div className="ml-auto font-bold text-gray-900">
            ${amount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyBar;
