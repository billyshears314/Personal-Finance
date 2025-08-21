"use client";
import { useState } from "react";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";
import Popup from "../../../components/Popup";

type MenuOpenType = "sort" | "filter" | "null";

interface TransactionSearchBarProps {
  search?: string;
  onSearchChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  budgetNames: string[];
}

const sortBy = {
  label: "Sort by",
  options: [
    {
      label: "Latest",
      value: "latest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
    {
      label: "A to Z",
      value: "a_to_z",
    },
    {
      label: "Z to A",
      value: "z_to_a",
    },
    {
      label: "Highest",
      value: "highest",
    },
    {
      label: "Lowest",
      value: "lowest",
    },
  ],
};

const TransactionSearchBar: React.FC<TransactionSearchBarProps> = ({
  onSearchChange,
  onCategoryFilterChange,
  onSortChange,
  search,
  budgetNames,
}) => {
  const [menuOpen, setMenuOpen] = useState<MenuOpenType>(null);

  const category = {
    label: "Category",
    options: [
      {
        label: "All transactions",
        value: "",
      },
    ],
  };

  budgetNames.forEach((budgetName: string) => {
    category.options.push({
      label: budgetName,
      value: budgetName,
    });
  });

  const handleSortChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    sort: string
  ) => {
    e.stopPropagation();
    setMenuOpen(null);
    onSortChange(sort);
  };

  const handleFilterChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    filter: string
  ) => {
    e.stopPropagation();
    setMenuOpen(null);
    onCategoryFilterChange(filter);
  };

  return (
    <div className="flex w-full mb-4">
      <div className="w-2/3 md:w-1/3">
        <SearchBar
          placeholderText="Search Transaction"
          onChange={onSearchChange}
          value={search}
        />
      </div>
      <div className="flex items-center justify-end w-1/3 md:w-2/3">
        <div className="hidden md:flex md:gap-4">
          <Dropdown
            {...sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          />
          <Dropdown
            {...category}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
          />
        </div>
        <div className="md:hidden flex gap-4">
          <div
            className="relative ml-auto cursor-pointer w-6 h-6 flex items-center justify-center"
            onClick={() => setMenuOpen("sort")}
          >
            <img src="images/icon-sort-mobile.svg" width="28" />
            {menuOpen === "sort" && (
              <Popup
                labels={sortBy.options.map((option) => option.label)}
                onClicks={sortBy.options.map(
                  (option) => (e) => handleSortChange(e, option.value)
                )}
              />
            )}
          </div>

          <div
            className="relative ml-auto cursor-pointer w-6 h-6 flex items-center justify-center"
            onClick={() => setMenuOpen("filter")}
          >
            <img src="images/icon-filter-mobile.svg" width="28" />
            {menuOpen === "filter" && (
              <Popup
                labels={category.options.map((option) => option.label)}
                onClicks={category.options.map(
                  (option) => (e) => handleFilterChange(e, option.value)
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSearchBar;
