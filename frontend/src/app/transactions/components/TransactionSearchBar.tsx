"use client";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";

interface TransactionSearchBarProps {
  search?: string;
  onSearchChange: (value: string) => void;
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
      value: "all",
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
      value: "dining_out",
    },
    {
      label: "Transportation",
      value: "transportation",
    },
    {
      label: "Personal Care",
      value: "personal_care",
    },
  ],
};

const TransactionSearchBar: React.FC<TransactionSearchBarProps> = ({
  onSearchChange,
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
        <Dropdown {...category} />
      </div>
    </div>
  );
};

export default TransactionSearchBar;
