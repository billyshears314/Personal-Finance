import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import Modal from "../Modal";
import InputField from "./InputField";
import DropdownWithColor from "./DropdownWithColor";
import Button from "./Button";
import { useAppStore } from "@/stores/useAppStore";
import { Pot } from "@/types";

type Mode = "add" | "edit";

interface AddEditPotModalProps {
  pot?: Pot;
  mode?: Mode;
  onClose: () => void;
}

const capitalizeEachWord = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const checkIfAlreadyUsed = (pots, theme) => {
  return pots.some((pot) => pot.theme.id === theme.id);
};

export default function AddEditPotModal({
  onClose,
  mode = "add",
  pot,
}: AddEditPotModalProps) {
  const [name, setName] = useState(pot?.name || "");
  const [target, setTarget] = useState<number | null>(pot?.target || null);
  const [colorTag, setColorTag] = useState<number | null>(
    pot?.theme?.id || null
  );

  const addDescription =
    "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.";
  const editDescription =
    "If your saving targets change, feel free to update your pots.";

  const createPot = useAppStore((state) => state.createPot);
  const updatePot = useAppStore((state) => state.updatePot);
  const pots = useAppStore((state) => state.pots);

  const { themes, fetchThemes } = useAppStore(
    useShallow((state) => ({
      themes: state.themes,
      fetchThemes: state.fetchThemes,
      loading: state.loading,
      error: state.error,
    }))
  );

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const save = () => {
    if (!name || target === null || colorTag === null) {
      alert("Please fill out all fields");
      return;
    }

    if (mode === "add" && colorTag) {
      createPot({ name, saved: 0, target, theme: { id: colorTag } });
    }

    if (mode === "edit" && colorTag) {
      updatePot(pot.id, {
        name,
        saved: pot.saved,
        target,
        theme: { id: colorTag },
      });
    }

    onClose();
  };

  const colorOptions = themes.map((theme) => {
    return {
      label: capitalizeEachWord(theme.name || "Unknown"),
      value: theme.id,
      color: theme.color || "red",
      alreadyUsed: checkIfAlreadyUsed(pots, theme),
    };
  });

  return (
    <Modal
      title={mode === "add" ? "Add New Pot" : "Edit Pot"}
      description={mode === "add" ? addDescription : editDescription}
      onClose={onClose}
    >
      <InputField
        label="Pot Name"
        placeholderText="e.g. Rainy Days"
        onChange={(value) => setName(value)}
        initialValue={name}
        maxCharacters={30}
      />
      <InputField
        label="Target"
        type="number"
        placeholderText="e.g. 2000"
        initialValue={target ? target.toString() : ""}
        onChange={(value) => setTarget(parseFloat(value))}
      />
      <DropdownWithColor
        label="Color Tag"
        options={colorOptions}
        onChange={(value) => setColorTag(value as number)}
        value={colorTag}
      />
      <Button
        text={mode === "add" ? "Add Pot" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
