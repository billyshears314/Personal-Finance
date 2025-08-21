"use client";

import React, { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  label?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  id,
  value,
  onChange,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className="flex items-center">
      {label && (
        <label
          htmlFor={selectId}
          className="text-gray-500 text-sm whitespace-nowrap mr-2"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className="border border-black rounded-lg px-2 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
