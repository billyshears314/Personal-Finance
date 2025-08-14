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
  onClose: () => void;
  mode?: Mode;
  pot?: Pot;
}

const capitalizeEachWord = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
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
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.";
  const editDescription = "Edit";

  const createPot = useAppStore((state) => state.createPot);

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

  useEffect(() => {});

  const save = () => {
    if (!name || target === null) {
      alert("Please fill out all fields");
      return;
    }

    if (mode === "add" && colorTag) {
      createPot({ name, saved: 0, target, theme: { id: colorTag } });
    }

    onClose();
  };

  const colorOptions = themes.map((theme) => {
    return {
      label: capitalizeEachWord(theme.name || "Unknown"),
      value: theme.id,
      color: theme.color || "red",
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
      />
      <Button
        text={mode === "add" ? "Add Pot" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
