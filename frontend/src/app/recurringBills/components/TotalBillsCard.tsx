const TotalBillsCard = () => {
  return (
    <div className="w-400 p-4 bg-gray-900 rounded-xl h-full flex md:flex-col items-center md:items-start">
      <div className="w-8 h-8 bg-green-800 m-2 md:my-8"></div>
      <div>
        <div className="text-base text-white mb-2">Total Bills</div>
        <div className="text-3xl text-white">$384.98</div>
      </div>
    </div>
  );
};

export default TotalBillsCard;
