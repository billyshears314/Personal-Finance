import { useState } from "react";
import { useShallow } from "zustand/shallow";
import Modal from "../Modal";
import InputField from "./InputField";
// import Dropdown from "../Dropdown";
import DropdownWithColor from "./DropdownWithColor";
import Button from "./Button";
import { Budget } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

type Mode = "add" | "edit";

interface AddEditBudgetModalProps {
  budget?: Budget;
  mode?: Mode;
  onClose: () => void;
}

const capitalizeEachWord = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const checkIfAlreadyUsed = (budgets, theme) => {
  return budgets.some((budget) => budget.theme.id === theme.id);
};

export default function AddEditBudgetModal({
  budget,
  onClose,
  mode = "add",
}: AddEditBudgetModalProps) {
  console.log("ATTEMPT");
  const [budgetCategory, setBudgetCategory] = useState("");
  const [maximumSpend, setMaximumSpend] = useState<number | null>(
    budget?.max ?? null
  );
  const [colorTag, setColorTag] = useState<number | null>(
    budget?.theme?.id || null
  );
  console.log("1");

  const addDescription =
    "Choose a category to set a spending budget. These categories can help you monitor spending.";
  const editDescription =
    "As your budgets change, feel free to update your spending limits.";

  const save = () => {
    console.log("SAVE");
    console.log("Budget Category: " + budgetCategory);
    console.log("Maximum Spend: " + maximumSpend);
    console.log("Theme: " + colorTag);
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

  const { themes } = useAppStore(
    useShallow((state) => ({
      themes: state.themes,
      fetchThemes: state.fetchThemes,
      loading: state.loading,
      error: state.error,
    }))
  );

  // TODO: FIX THIS...
  // useEffect(() => {
  //   console.log("USE EFFECT");
  //   fetchThemes();
  // }, [fetchThemes]);

  const budgets = useAppStore((state) => state.budgets);

  const colorOptions = themes.map((theme) => {
    return {
      label: capitalizeEachWord(theme.name || "Unknown"),
      value: theme.id,
      color: theme.color || "red",
      alreadyUsed: checkIfAlreadyUsed(budgets, theme),
    };
  });

  return (
    <Modal
      title={mode === "add" ? "Add New Budget" : "Edit Budget"}
      description={mode === "add" ? addDescription : editDescription}
      onClose={onClose}
    >
      <DropdownWithColor
        label="Budget Category"
        placeholderText="Choose Budget"
        options={budgetCategoryOptions}
        onChange={(value) => setBudgetCategory(value as string)}
        hasColor={false}
      />
      <InputField
        label="Maximum Spend"
        type="number"
        placeholderText="e.g. 2000"
        onChange={(value) => setMaximumSpend(parseInt(value))}
      />
      <DropdownWithColor
        label="Theme"
        options={colorOptions}
        onChange={(value) => setColorTag(value as number)}
        value={colorTag}
      />
      <Button
        text={mode === "add" ? "Add Budget" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
