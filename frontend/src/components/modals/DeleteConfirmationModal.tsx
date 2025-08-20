import Modal from "../Modal";
import Button from "./Button";

type EntityType = "budget" | "pot";

interface DeleteConfirmationModalProps {
  title: string;
  entityType: EntityType;
  onDelete: () => void;
  onClose: () => void;
}

export default function AddEditBudgetModal({
  title,
  entityType,
  onDelete,
  onClose,
}: DeleteConfirmationModalProps) {
  const description = `Are you sure you want to delete this ${entityType}? This action cannot be reversed, and all the data inside it will be removed forever.`;

  return (
    <Modal
      title={`Delete '${title}'?`}
      description={description}
      onClose={onClose}
    >
      <Button
        text="Yes, Confirm Deletion"
        onClick={onDelete}
        type="confirm"
      ></Button>
      <Button
        text="No, I want to go back"
        onClick={onClose}
        type="cancel"
      ></Button>
    </Modal>
  );
}
