"use client";

import React, { useId, useState } from "react";

interface Option {
  value: string | number;
  label: string;
  color?: string;
}

interface DropdownWithColorProps {
  options: Option[];
  label?: string;
  id?: string;
  value?: string;
  onChange: (value: string | number) => void;
}

const DropdownWithColor: React.FC<DropdownWithColorProps> = ({
  options,
  label,
  id,
  // value,
  onChange,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const handleClickOption = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setShowOptions(false);
  };

  const handleChooseColor = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="flex flex-col my-4">
      {/* {label && (
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
            {opt.color ? (
              <>
                <span
                  className="w-4 h-4"
                  style={{ backgroundColor: opt.color }}
                ></span>
                <span>A {opt.label}</span>
              </>
            ) : (
              <span>{opt.label}</span>
            )}
          </option>
        ))}
      </select> */}

      <div className="relative inline-block text-left">
        <div>
          {label && (
            <label
              htmlFor={selectId}
              className="text-gray-500 text-xxs font-bold whitespace-nowrap mr-2 mb-1"
            >
              {label}
            </label>
          )}
        </div>
        <button
          className="bg-white border px-4 py-2 rounded text-sm w-full"
          onClick={handleChooseColor}
        >
          {selectedOption ? (
            <div className="flex items-center cursor-pointer">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: selectedOption.color }}
              ></span>
              <span>{selectedOption.label}</span>
              <img src="images/icon-caret-down.svg" className="ml-auto" />
            </div>
          ) : (
            <div className="flex items-center">
              <div>Choose Color</div>
              <img src="images/icon-caret-down.svg" className="ml-auto" />
            </div>
          )}
        </button>
        <div
          className={`absolute mt-2 w-40 bg-white border rounded shadow max-h-40 overflow-y-auto ${
            showOptions ? "visible" : "hidden"
          }`}
        >
          {options.map((opt) => (
            <div
              className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
              onClick={() => handleClickOption(opt)}
              key={opt.value}
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: opt.color }}
              ></span>
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownWithColor;
