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
  onChange: (value: string) => void;
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
    <div className="flex flex-col my-4">
      {label && (
        <label
          htmlFor={selectId}
          className="text-gray-500 text-xxs font-bold whitespace-nowrap mr-2 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-black rounded-lg px-2 py-2 text-sm w-full"
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
