interface DonutProps {
  amount: number;
  limit: number;
}

const OUTER_RING_RADIUS = 16;
const OUTER_RING_WIDTH = 8;
const INNER_RING_WIDTH = 4;
const INNER_RING_RADIUS =
  OUTER_RING_RADIUS - OUTER_RING_WIDTH / 2 - INNER_RING_WIDTH / 2;

const OUTER_RING_CIRCUMFERENCE = 2 * Math.PI * OUTER_RING_RADIUS;
const INNER_RING_CIRCUMFERENCE = 2 * Math.PI * INNER_RING_RADIUS;

const categoryData = [
  {
    name: "Entertainment",
    amount: 50.0,
  },
  {
    name: "Bills",
    amount: 750.0,
  },
  {
    name: "Dining Out",
    amount: 75.0,
  },
  {
    name: "Personal Care",
    amount: 100.0,
  },
];

const getTotal = (): number => {
  return categoryData.reduce(
    (accumulator, categoryData) => accumulator + categoryData.amount,
    0
  );
};

const getCategoryOffset = (
  circumference: number,
  categoryIndex: number
): number => {
  let sum = 0;
  let currentIndex = 0;

  while (currentIndex < categoryIndex) {
    sum += categoryData[currentIndex].amount;
    currentIndex++;
  }

  const total = categoryData.reduce(
    (accumulator, categoryData) => accumulator + categoryData.amount,
    0
  );

  console.log("------------------");
  console.log(calculateOffset(circumference, (sum / total) * 100));

  return (
    -calculateOffset(circumference, (sum / total) * 100) +
    0.5 * Math.PI * circumference
  );
};

const calculateDashArray = (circumference: number, percent: number): string => {
  const dashLength = circumference * (percent / 100);
  const gapLength = circumference * (1 - percent / 100);

  return `${dashLength} ${gapLength}`;
};

const calculateOffset = (circumference: number, percent: number): number => {
  return (circumference * percent) / 100;
};

const Donut: React.FC<DonutProps> = ({ amount, limit }) => {
  return (
    <div>
      <svg width="250" height="250" viewBox="0 0 48 48">
        <circle r="16" cx="16" cy="16" fill="white"></circle>
        <circle
          r={OUTER_RING_RADIUS}
          cx="24"
          cy="24"
          fill="transparent"
          //   stroke="#4CAF50"
          strokeWidth={OUTER_RING_WIDTH}
          strokeDasharray={calculateDashArray(
            OUTER_RING_CIRCUMFERENCE,
            (categoryData[0].amount / getTotal()) * 100
          )}
          strokeDashoffset={getCategoryOffset(OUTER_RING_CIRCUMFERENCE, 0)}
          className="stroke-category-green"
        ></circle>
        {/* <circle
          r={INNER_RING_RADIUS}
          cx="24"
          cy="24"
          fill="transparent"
          strokeWidth={INNER_RING_WIDTH}
          strokeDasharray={calculateDashArray(INNER_RING_CIRCUMFERENCE, 40)}
          className="stroke-category-1/25"
        ></circle> */}
        <circle
          r={OUTER_RING_RADIUS}
          cx="24"
          cy="24"
          fill="transparent"
          strokeWidth={OUTER_RING_WIDTH}
          strokeDasharray={calculateDashArray(
            OUTER_RING_CIRCUMFERENCE,
            (categoryData[1].amount / getTotal()) * 100
          )}
          strokeDashoffset={getCategoryOffset(OUTER_RING_CIRCUMFERENCE, 1)}
          className="stroke-category-cyan"
        ></circle>
        <circle
          r={OUTER_RING_RADIUS}
          cx="24"
          cy="24"
          fill="transparent"
          strokeWidth={OUTER_RING_WIDTH}
          strokeDasharray={calculateDashArray(
            OUTER_RING_CIRCUMFERENCE,
            (categoryData[2].amount / getTotal()) * 100
          )}
          strokeDashoffset={getCategoryOffset(OUTER_RING_CIRCUMFERENCE, 2)}
          className="stroke-category-yellow"
        ></circle>
        <circle
          r={OUTER_RING_RADIUS}
          cx="24"
          cy="24"
          fill="transparent"
          strokeWidth={OUTER_RING_WIDTH}
          strokeDasharray={calculateDashArray(
            OUTER_RING_CIRCUMFERENCE,
            (categoryData[3].amount / getTotal()) * 100
          )}
          strokeDashoffset={getCategoryOffset(OUTER_RING_CIRCUMFERENCE, 3)}
          className="stroke-category-navy"
        ></circle>
      </svg>
    </div>
    // <div className="w-64 h-64 bg-blue-500 rounded-full relative">
    //   <div className="w-56 h-56 bg-orange-200 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    //   <div className="w-32 h-32 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    //   <div className="flex justify-center w-full h-full bg-blue-400 items-center z-1000">
    //     <div className="w-30 h-30">
    //       <div className="text-base font-bold">${amount}</div>
    //       <div className="text-sm text-gray-500">of ${limit} limit</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Donut;
