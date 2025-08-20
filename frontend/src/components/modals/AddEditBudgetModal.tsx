import { useState } from "react";
import Modal from "../Modal";
import InputField from "./InputField";
import Dropdown from "./DropdownWithColor";
import Button from "./Button";
import { Budget } from "@/types";

type Mode = "add" | "edit";

interface AddEditBudgetModalProps {
  budget: Budget;
  onClose: () => void;
  mode?: Mode;
}

export default function AddEditBudgetModal({
  onClose,
  mode = "add",
}: AddEditBudgetModalProps) {
  const [budgetCategory, setBudgetCategory] = useState("");
  const [maximumSpend, setMaximumSpend] = useState<number | null>(null);
  const [theme, setTheme] = useState<number | null>();

  const addDescription =
    "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.";
  const editDescription =
    "If your saving targets change, feel free to update your pots";

  const save = () => {
    console.log("SAVE");
    console.log("Budget Category: " + budgetCategory);
    console.log("Maximum Spend: " + maximumSpend);
    console.log("Theme: " + theme);
  };

  const budgetCategoryOptions = [
    {
      label: "Entertainment",
      value: "entertainment",
    },
    {
      label: "Bills",
      value: "bills",
    },
    {
      label: "Dining Out",
      value: "dining_out",
    },
    {
      label: "Personal Care",
      value: "personal_care",
    },
  ];

  const themeOptions = [
    {
      label: "Green",
      value: 1,
      color: "red",
    },
    {
      label: "Red",
      value: 2,
      color: "red",
    },
    {
      label: "Blue",
      value: 3,
      color: "red",
    },
  ];

  return (
    <Modal
      title={mode === "add" ? "Add New Budget" : "Edit Budget"}
      description={mode === "add" ? addDescription : editDescription}
      onClose={onClose}
    >
      <Dropdown
        label="Budget Category"
        options={budgetCategoryOptions}
        onChange={(value) => setBudgetCategory(value as string)}
      />
      <InputField
        label="Maximum Spend"
        type="number"
        placeholderText="e.g. 2000"
        onChange={(value) => setMaximumSpend(parseInt(value))}
      />
      <Dropdown
        label="Theme"
        options={themeOptions}
        onChange={(value) => setTheme(value as number)}
      />
      <Button
        text={mode === "add" ? "Add Budget" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
