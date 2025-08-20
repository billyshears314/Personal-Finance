import { useState, useEffect } from "react";
import TitleWithDot from "../../../components/TitleWithDot";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal";
import AddEditBudgetModal from "../../../components/modals/AddEditBudgetModal";
import LatestSpendingWidget from "./LatestSpendingWidget";
import MoneyRemainingBar from "./MoneyRemainingBar";
import { Budget } from "@/types";

interface SpendingCardProps {
  budget: Budget;
}

type ModalType = "edit" | "delete" | null;

const SpendingCard: React.FC<SpendingCardProps> = ({ budget }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleOpenEdit = () => {
    console.log("HANDLE OPEN EDIT");
    setModalType("edit");
  };

  const handleOpenDelete = () => {
    setModalType("delete");
  };

  const handleDelete = () => {
    console.log("HANDLE DELETE");
  };

  useEffect(() => {
    if (modalType) setMenuOpen(false);
  }, [modalType]);

  return (
    <>
      <div className="p-8 rounded-xl bg-white">
        <div className="flex items-center mb-4">
          <TitleWithDot title={budget.name} color={budget.theme.color} />
          <div
            className="relative ml-auto cursor-pointer w-6 h-6 flex items-center justify-center"
            onClick={handleOpenMenu}
          >
            <img src="images/icon-ellipsis.svg" />
            {menuOpen && (
              <div className="absolute top-5 right-0 whitespace-nowrap flex flex-col divide-y bg-white py-2 px-4 border rounded-lg">
                <button onClick={handleOpenEdit} className="text-left py-2">
                  Edit Budget
                </button>
                <button onClick={handleOpenDelete} className="text-left py-2">
                  Delete Budget
                </button>
              </div>
            )}
          </div>
        </div>
        <MoneyRemainingBar
          color={budget.theme.color}
          spent={budget.spent}
          max={budget.max}
        />
        <div className="mt-4">
          <LatestSpendingWidget />
        </div>
      </div>
      {modalType === "edit" && (
        <AddEditBudgetModal
          mode={"edit"}
          budget={budget}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === "delete" && (
        <DeleteConfirmationModal
          title={budget.name}
          entityType={"budget"}
          onDelete={handleDelete}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  );
};

export default SpendingCard;
