const SummaryCard = () => {
  const row = (title: string, amount: string) => {
    return (
      <tr className="h-14">
        <td className="text-gray-500 text-base">{title}</td>
        <td className="text-right text-gray-900 font-bold text-base">
          {amount}
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-gray-900 font-bold mb-2">Summary</div>
      <table className="w-full">
        <tbody className="divide-y">
          {row("Paid Bills", "4 ($190.00)")}
          {row("Total Upcoming", "4 ($194.98)")}
          {row("Due Soon", "2 ($59.98)")}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryCard;
