import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { useAppStore } from "@/stores/useAppStore";

type Mode = "add" | "edit";

interface AddEditPotModalProps {
  onClose: () => void;
  mode?: Mode;
}

export default function AddEditPotModal({
  onClose,
  mode = "add",
}: AddEditPotModalProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<number | null>(null);
  const [colorTag, setColorTag] = useState("");

  const addDescription =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.";
  const editDescription = "B";

  const createPot = useAppStore((state) => state.createPot);

  const save = () => {
    console.log("SAVE");
    console.log("NAME: " + name);
    console.log("Target: " + target);
    console.log("Color Tag: " + colorTag);

    if (!name || target === null) {
      alert("Please fill out all fields");
      return;
    }

    if (mode === "add") {
      createPot({ name, saved: 0, target });
    }

    onClose();
  };

  const colorOptions = [
    {
      label: "Green",
      value: "green",
    },
    {
      label: "Red",
      value: "red",
    },
    {
      label: "Blue",
      value: "blue",
    },
  ];

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
        maxCharacters={30}
      />
      <InputField
        label="Target"
        type="number"
        placeholderText="e.g. 2000"
        onChange={(value) => setTarget(value)}
      />
      <Dropdown
        label="Color Tag"
        options={colorOptions}
        onChange={(value) => setColorTag(value)}
      />
      <Button
        text={mode === "add" ? "Add Pot" : "Save Changes"}
        onClick={save}
      ></Button>
    </Modal>
  );
}
