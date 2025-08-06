import { useState } from "react";

import Modal from "../Modal";
import InputField from "./InputField";
import Dropdown from "./DropdownWithColor";
import Button from "./Button";
import { useAppStore } from "@/stores/useAppStore";
import { Pot } from "@/types";

interface AddWithdrawToPotModalProps {
  /* TODO Make type a real type instead of string */
  type: string;
  pot: Pot;
  onClose: () => void;
}

export default function AddWithdrawToPotModal({
  type,
  pot,
  onClose,
}: AddWithdrawToPotModalProps) {
  const [amount, setAmount] = useState(null);

  const title =
    type === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`;
  const description = type === "add" ? "" : "";

  const depositMoneyToPot = useAppStore((state) => state.depositMoneyToPot);
  const withdrawMoneyFromPot = useAppStore(
    (state) => state.withdrawMoneyFromPot
  );

  const confirm = () => {
    if (!amount) return;
    if (type === "add") {
      depositMoneyToPot(pot.id, amount);
    } else {
      withdrawMoneyFromPot(pot.id, amount);
    }
    onClose();
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
