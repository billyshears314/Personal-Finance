import { useState } from "react";

import TitleWithDot from "../../../components/TitleWithDot";
import Button from "../../../components/Button";
import AddWithdrawToPotModal from "@/components/modals/AddWithdrawToPotModal";
import AddEditPotModal from "@/components/modals/AddEditPotModal";
import PotBar from "../../../components/PotBar";
import { Pot } from "@/types";

type ModalType = "add" | "withdraw" | "edit" | "delete" | null;

interface PotCardProps {
  pot: Pot;
}

const PotCard: React.FC<PotCardProps> = ({ pot }: PotCardProps) => {
  const [modalType, setModalType] = useState<ModalType>(null);

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

  return (
    <>
      <div className="rounded-xl bg-white p-4">
        <div className="flex items-center">
          <TitleWithDot title={pot.name} color={pot.theme.color || "red"} />
          <div
            className="ml-auto cursor-pointer w-6 h-6 flex items-center justify-center"
            onClick={handleOpenDots}
          >
            <img src="images/icon-ellipsis.svg" />
          </div>
        </div>
        <div className="my-8">
          <PotBar pot={pot} />
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
