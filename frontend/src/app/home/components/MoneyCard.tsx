type cardTypes = "regular" | "active";

interface MoneyCardProps {
  title: string;
  amount: number;
  type?: cardTypes;
}

const MoneyCard: React.FC<MoneyCardProps> = ({
  title,
  amount,
  type = "regular",
}) => {
  const classNames = {
    regular: "bg-white text-gray-900",
    active: "bg-gray-900 text-white",
  };

  return (
    <div className={`rounded-xl p-6 ${classNames[type]}`}>
      <div className="mb-4">{title}</div>
      {amount && (
        <div className="text-3xl font-semibold">
          $
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      )}
    </div>
  );
};

export default MoneyCard;
