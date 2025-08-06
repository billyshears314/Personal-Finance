interface TransactionAmountProps {
  amount: number;
}

const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount }) => {
  return (
    <>
      {amount >= 0 ? (
        <span className="text-green2">+${amount.toFixed(2)}</span>
      ) : (
        <span className="text-gray-900">-${Math.abs(amount).toFixed(2)}</span>
      )}
    </>
  );
};

export default TransactionAmount;
