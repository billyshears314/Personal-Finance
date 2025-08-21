import { useState, useEffect } from "react";
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
  return budgets.some((budget) => budget?.theme?.id === theme.id);
};

export default function AddEditBudgetModal({
  budget,
  onClose,
  mode = "add",
}: AddEditBudgetModalProps) {
  console.log("RENDER ADD EDIT BUDGET MODAL");
  const [name, setName] = useState(budget?.name || "");
  const [maximumSpend, setMaximumSpend] = useState<number | null>(
    budget?.max ?? null
  );
  const [colorTag, setColorTag] = useState<number | null>(
    budget?.theme?.id || null
  );

  const createBudget = useAppStore((state) => state.createBudget);
  const updateBudget = useAppStore((state) => state.updateBudget);
  const budgets = useAppStore((state) => state.budgets);

  const addDescription =
    "Choose a category to set a spending budget. These categories can help you monitor spending.";
  const editDescription =
    "As your budgets change, feel free to update your spending limits.";

  // const { themes, fetchThemes, loading } = useAppStore(
  //   useShallow((state) => ({
  //     themes: state.themes,
  //     fetchThemes: state.fetchThemes,
  //     loading: state.loading,
  //     error: state.error,
  //   }))
  // );

  const fetchThemes = useAppStore((state) => state.fetchThemes);
  const themes = useAppStore((state) => state.themes);

  // TODO: FIX THIS...
  useEffect(() => {
    console.log("USE EFFECT");
    fetchThemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchThemes]);

  console.log("THEMES: " + JSON.stringify(themes));

  const save = () => {
    if (!budget) return;

    if (!name || maximumSpend === null || colorTag === null) {
      alert("Please fill out all fields");
      return;
    }

    console.log("SAVE");
    // console.log("Budget Category: " + budgetCategory);
    console.log("Maximum Spend: " + maximumSpend);
    console.log("Theme: " + colorTag);

    if (mode === "add" && colorTag) {
      createBudget({
        name,
        spent: 0,
        max: maximumSpend,
        theme: { id: colorTag },
      });
    }

    if (mode === "edit" && colorTag) {
      updateBudget(budget.id, {
        name,
        spent: budget.spent,
        max: budget.max,
        theme: { id: colorTag },
      });
    }

    onClose();
  };

  // const budgetCategoryOptions = [
  //   {
  //     label: "Entertainment",
  //     value: "entertainment",
  //   },
  //   {
  //     label: "Bills",
  //     value: "bills",
  //   },
  //   {
  //     label: "Dining Out",
  //     value: "dining_out",
  //   },
  //   {
  //     label: "Personal Care",
  //     value: "personal_care",
  //   },
  // ];

  const colorOptions = themes.map((theme) => {
    return {
      label: capitalizeEachWord(theme?.name || "Unknown"),
      value: theme?.id,
      color: theme?.color || "red",
      alreadyUsed: checkIfAlreadyUsed(budgets, theme),
    };
  });

  return (
    <Modal
      title={mode === "add" ? "Add New Budget" : "Edit Budget"}
      description={mode === "add" ? addDescription : editDescription}
      onClose={onClose}
    >
      {/* <DropdownWithColor
        label="Budget Category"
        placeholderText="Choose Budget"
        options={budgetCategoryOptions}
        onChange={(value) => setBudgetCategory(value as string)}
        hasColor={false}
      /> */}
      <div className="mb-4">
        <InputField
          label="Budget Name"
          onChange={(value) => setName(value)}
          initialValue={name}
        />
      </div>
      <InputField
        label="Maximum Spend"
        type="number"
        placeholderText="e.g. 2000"
        onChange={(value) => setMaximumSpend(parseInt(value))}
        initialValue={maximumSpend}
      />
      {themes.length > 0 && (
        <DropdownWithColor
          label="Theme"
          options={colorOptions}
          onChange={(value) => setColorTag(value as number)}
          value={colorTag}
        />
      )}
      <Button
        text={mode === "add" ? "Add Budget" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
