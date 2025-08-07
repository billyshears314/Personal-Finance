"use client";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";

interface TransactionSearchBarProps {
  search?: string;
  onSearchChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
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

const category = {
  label: "Category",
  options: [
    {
      label: "All transactions",
      value: "",
    },
    {
      label: "Entertainment",
      value: "entertainment",
    },
    {
      label: "Bills",
      value: "bills",
    },
    {
      label: "Groceries",
      value: "groceries",
    },
    {
      label: "Dining Out",
      value: "Dining Out",
    },
    {
      label: "Transportation",
      value: "transportation",
    },
    {
      label: "Personal Care",
      value: "Personal Care",
    },
  ],
};

const TransactionSearchBar: React.FC<TransactionSearchBarProps> = ({
  onSearchChange,
  onCategoryFilterChange,
  search,
}) => {
  return (
    <div className="flex w-full mb-4">
      <SearchBar
        placeholderText="Search Transaction"
        onChange={onSearchChange}
        value={search}
      />
      <div className="flex items-center gap-4">
        <Dropdown {...sortBy} />
        <Dropdown
          {...category}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TransactionSearchBar;
