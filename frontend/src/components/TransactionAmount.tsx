interface TransactionAmountProps {
  amount: number;
}

const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount }) => {
  return (
    <>
      {amount >= 0 ? (
        <span className="text-green2 font-bold">+${amount.toFixed(2)}</span>
      ) : (
        <span className="text-gray-900 font-bold">
          -${Math.abs(amount).toFixed(2)}
        </span>
      )}
    </>
  );
};

export default TransactionAmount;
