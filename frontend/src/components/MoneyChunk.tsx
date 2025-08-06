interface MoneyChunkProps {
  color: string;
  name: string;
  amount: number;
  showCents?: boolean;
}

const MoneyChunk: React.FC<MoneyChunkProps> = ({
  color,
  name,
  amount,
  showCents = true,
}) => {
  return (
    <div className="flex">
      <div className="w-1" style={{ backgroundColor: color }}></div>
      <div className="ml-4">
        <div className="text-xs text-gray-500 mb-1">{name}</div>
        <div className="text-sm text-gray-900 font-bold">
          ${showCents ? amount.toFixed(2) : amount.toFixed(0)}
        </div>
      </div>
    </div>
  );
};

export default MoneyChunk;
