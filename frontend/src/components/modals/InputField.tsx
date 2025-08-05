import { useId, useState } from "react";
import { Place } from "@mui/icons-material";

type InputFieldType = "text" | "number";

interface InputFieldProps {
  label: string;
  placeholderText: string;
  onChange: (value: any) => void;
  id?: string;
  initialValue?: string;
  type?: InputFieldType;
  maxCharacters?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholderText,
  onChange,
  id,
  initialValue = "",
  type = "text",
  maxCharacters,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  const [value, setValue] = useState(initialValue);

  const handleOnChange = (e: any) => {
    const val = e.target.value;
    if (maxCharacters && val.length > maxCharacters) return;
    setValue(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col my-2">
      <label
        htmlFor={selectId}
        className="text-xxs font-bold text-gray-500 mb-1"
      >
        {label}
      </label>
      <input
        id={selectId}
        type={type}
        value={value}
        placeholder={placeholderText}
        onChange={handleOnChange}
        className="border p-2 rounded border-black text-xs"
      ></input>
      {maxCharacters && (
        <div className="text-right text-xxs text-gray-500 mt-1 tracking-wider">
          {value.length} of {maxCharacters} characters left
        </div>
      )}
    </div>
  );
};

export default InputField;
