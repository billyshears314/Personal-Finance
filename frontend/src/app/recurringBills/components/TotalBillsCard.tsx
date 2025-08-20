const TotalBillsCard = () => {
  return (
    <div className="w-400 p-4 bg-gray-900 rounded-xl h-full flex md:flex-col md:items-start">
      <img
        src="images/icon-recurring-bills.svg"
        className="m-2 md:mt-4 md:mb-6 mr-6"
      />
      <div>
        <div className="text-base text-white mb-2">Total Bills</div>
        <div className="text-3xl text-white">$384.98</div>
      </div>
    </div>
  );
};

export default TotalBillsCard;
