import { useState } from "react";

import TitleWithDot from "../../../components/TitleWithDot";
import Button from "../../../components/Button";
import AddWithdrawToPotModal from "@/components/modals/AddWithdrawToPotModal";
import AddEditPotModal from "@/components/modals/AddEditPotModal";
import { Pot } from "@/types";

type ModalType = "add" | "withdraw" | "edit" | "delete" | null;

interface PotCardProps {
  pot: Pot;
}

const formatMoney = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const calculatePercent = (amount: number, target: number) => {
  return 100 * (amount / target);
};

const formatPercent = (percent: number) => {
  return `${percent.toFixed(2)}%`;
};

const PotCard: React.FC<PotCardProps> = ({ pot }: PotCardProps) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const bar = (color: string, percent: number) => {
    return (
      <div className="my-2 h-2 w-full bg-beige-100 rounded-full">
        <div
          className={`h-full rounded-full`}
          style={{ width: percent + "%", backgroundColor: color }}
        ></div>
      </div>
    );
  };

  const handleAddOpen = (potName: string) => {
    console.log("POT NAME: " + potName);
    setModalType("add");
  };

  const handleWithdrawOpen = (potName: string) => {
    console.log("POT NAME: " + potName);
    setModalType("withdraw");
  };

  const handleOpenDots = () => {
    setModalType("edit");
  };

  const percentOfTarget = calculatePercent(pot.saved, pot.target);

  return (
    <>
      <div className="rounded-xl bg-white p-4">
        <div className="flex items-center">
          <TitleWithDot title={pot.name} color={pot.theme.color || "red"} />
          <div className="ml-auto cursor-pointer" onClick={handleOpenDots}>
            <img src="images/icon-ellipsis.svg" />
          </div>
        </div>
        <div className="my-8">
          <div className="flex items-center">
            <div className="text-base text-gray-500">Total Saved</div>
            <div className="text-3xl text-gray-900 ml-auto font-bold">
              {formatMoney(pot.saved)}
            </div>
          </div>
          <div className="">
            {bar(pot.theme.color || "red", percentOfTarget)}
          </div>
          <div className="flex">
            <div className="text-sm text-gray-500">
              {formatPercent(percentOfTarget)}
            </div>
            <div className="text-sm text-gray-500 ml-auto">
              Target of {formatMoney(pot.target)}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-1/2">
            <Button
              type="secondary"
              text="+ Add Money"
              fullWidth
              onClick={() => handleAddOpen(pot.name)}
            />
          </div>
          <div className="w-1/2">
            <Button
              type="secondary"
              text="Withdraw"
              fullWidth
              onClick={() => handleWithdrawOpen(pot.name)}
            />
          </div>
        </div>
      </div>
      {(modalType === "add" || modalType === "withdraw") && (
        <AddWithdrawToPotModal
          type={modalType}
          pot={pot}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === "edit" && (
        <AddEditPotModal
          mode={modalType}
          pot={pot}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  );
};

export default PotCard;
