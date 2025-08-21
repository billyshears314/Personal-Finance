import { useEffect, useState } from "react";

import TitleWithDot from "../../../components/TitleWithDot";
import Button from "../../../components/Button";
import AddWithdrawToPotModal from "@/components/modals/AddWithdrawToPotModal";
import AddEditPotModal from "@/components/modals/AddEditPotModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import PotBar from "../../../components/PotBar";
import Popup from "../../../components/Popup";
import { Pot } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

type ModalType = "add" | "withdraw" | "edit" | "delete" | null;

interface PotCardProps {
  pot: Pot;
}

const PotCard: React.FC<PotCardProps> = ({ pot }: PotCardProps) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const deletePot = useAppStore((state) => state.deletePot);

  const handleAddOpen = () => {
    setModalType("add");
  };

  const handleWithdrawOpen = () => {
    setModalType("withdraw");
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleOpenEdit = () => {
    setModalType("edit");
  };

  const handleOpenDelete = () => {
    setModalType("delete");
  };

  const handleDelete = () => {
    deletePot(pot.id);
  };

  useEffect(() => {
    if (modalType) setMenuOpen(false);
  }, [modalType]);

  console.log("POT: " + JSON.stringify(pot, null, 2));

  return (
    <>
      <div className="rounded-xl bg-white p-4">
        <div className="flex items-center">
          <TitleWithDot title={pot.name} color={pot?.theme?.color || "red"} />
          <div
            className="relative ml-auto cursor-pointer w-6 h-6 flex items-center justify-center"
            onClick={handleOpenMenu}
          >
            <img src="images/icon-ellipsis.svg" />
            {menuOpen && (
              <Popup
                labels={["Edit Pot", "Delete Pot"]}
                onClicks={[handleOpenEdit, handleOpenDelete]}
              />
            )}
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
              onClick={handleAddOpen}
            />
          </div>
          <div className="w-1/2">
            <Button
              type="secondary"
              text="Withdraw"
              fullWidth
              onClick={handleWithdrawOpen}
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
      {modalType === "delete" && (
        <DeleteConfirmationModal
          title={pot.name}
          entityType={"pot"}
          onDelete={handleDelete}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  );
};

export default PotCard;
