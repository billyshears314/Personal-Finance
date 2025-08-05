import { useState } from "react";

import Modal from "../Modal";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Button from "./Button";

interface AddWithdrawToPotModalProps {
  /* TODO Make type a real type instead of string */
  type: string;
  potName: string;
  onClose: () => void;
}

export default function AddWithdrawToPotModal({
  type,
  potName,
  onClose,
}: AddWithdrawToPotModalProps) {
  const [amount, setAmount] = useState(null);

  const title =
    type === "add" ? `Add to '${potName}'` : `Withdraw from '${potName}'`;
  const description = type === "add" ? "" : "";

  const confirm = () => {
    console.log("CONFIRM");
  };

  return (
    <Modal title={title} description={description} onClose={onClose}>
      <div></div>
      <InputField
        type="number"
        placeholderText="e.g. 20"
        label={`Amount to ${type === "add" ? "Add" : "Withdraw"}`}
        onChange={(value) => setAmount(value)}
      />
      <Button
        text={type === "add" ? "Confirm Addition" : "Confirm Withdrawal"}
        onClick={confirm}
      ></Button>
    </Modal>
  );
}
