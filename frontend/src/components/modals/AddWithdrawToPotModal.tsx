import { useState } from "react";

import Modal from "../Modal";
import InputField from "./InputField";
// import Dropdown from "./DropdownWithColor";
import Button from "./Button";
import PotBar from "../PotBar";
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
  const [amount, setAmount] = useState<number | null>(null);

  const title =
    type === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`;
  const description =
    type === "add"
      ? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
      : "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.";

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
      <InputField
        type="number"
        placeholderText="e.g. 20"
        label={`Amount to ${type === "add" ? "Add" : "Withdraw"}`}
        onChange={(value) => setAmount(parseInt(value))}
      />
      <div className="pt-4 pb-8">
        <PotBar
          pot={pot}
          valueChange={type === "add" ? amount : -amount}
          type={type}
        />
      </div>
      <Button
        text={type === "add" ? "Confirm Addition" : "Confirm Withdrawal"}
        onClick={confirm}
      ></Button>
    </Modal>
  );
}
