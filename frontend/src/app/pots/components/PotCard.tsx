import { useState } from "react";

import TitleWithDot from "../../../components/TitleWithDot";
import Button from "../../../components/Button";
import AddWithdrawToPotModal from "@/components/modals/AddWithdrawToPotModal";

interface PotCardProps {
  title: string;
  currentValue: number;
  target: number;
  theme: string;
}

const formatMoney = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const calculatePercent = (amount: number, target: number) => {
  return `${(100 * (amount / target)).toFixed(2)}%`;
};

const PotCard: React.FC<PotCardProps> = ({
  title,
  currentValue,
  target,
  theme,
}: PotCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addWithdrawType, setAddWithdrawType] = useState("");
  const [potNameOpened, setPotNameOpened] = useState("");

  const handleAddNewPot = () => {
    console.log("HANDLE ADD NEW POT");
    setIsModalOpen(true);
  };

  const bar = () => {
    return (
      <div className="my-2 h-2 w-full bg-beige-100 rounded-full">
        <div className={`w-20 h-full bg-category-${theme} rounded-full`}></div>
      </div>
    );
  };

  const handleAddOpen = (potName: string) => {
    setPotNameOpened(potName);
    setAddWithdrawType("add");
    setIsModalOpen(true);
  };

  const handleWithdrawOpen = (potName: string) => {
    setPotNameOpened(potName);
    setAddWithdrawType("withdraw");
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-xl bg-white p-4">
        <div className="flex items-center">
          <TitleWithDot title={title} theme={theme} />
          <div className="ml-auto">
            <img src="images/icon-ellipsis.svg" />
          </div>
        </div>
        <div className="my-8">
          <div className="flex items-center">
            <div className="text-base text-gray-500">Total Saved</div>
            <div className="text-3xl text-gray-900 ml-auto font-bold">
              {formatMoney(currentValue)}
            </div>
          </div>
          <div className="">{bar()}</div>
          <div className="flex">
            <div className="text-sm text-gray-500">
              {calculatePercent(currentValue, target)}
            </div>
            <div className="text-sm text-gray-500 ml-auto">
              Target of {formatMoney(target)}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-1/2">
            <Button
              type="secondary"
              text="+ Add Money"
              fullWidth
              onClick={() => handleAddOpen(title)}
            />
          </div>
          <div className="w-1/2">
            <Button
              type="secondary"
              text="Withdraw"
              fullWidth
              onClick={() => handleWithdrawOpen(title)}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddWithdrawToPotModal
          type={addWithdrawType}
          potName={potNameOpened}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PotCard;
