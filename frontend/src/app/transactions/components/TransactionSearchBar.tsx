"use client";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";

interface TransactionSearchBarProps {
  search?: string;
  onSearchChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
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

// const category = {
//   label: "Category",
//   options: [
//     {
//       label: "All transactions",
//       value: "",
//     },
//   ],
// };

const TransactionSearchBar: React.FC<TransactionSearchBarProps> = ({
  onSearchChange,
  onCategoryFilterChange,
  search,
  budgetNames,
}) => {
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

  return (
    <div className="flex w-full mb-4">
      <div className="w-2/3 md:w-1/3">
        <SearchBar
          placeholderText="Search Transaction"
          onChange={onSearchChange}
          value={search}
        />
      </div>
      <div className="flex items-center lg:justify-end w-1/3 md:w-2/3">
        <div className="hidden md:block md:flex md:gap-4">
          <Dropdown {...sortBy} />
          <Dropdown
            {...category}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
          />
        </div>
      </div>
      <div className="md:hidden">Filters</div>
    </div>
  );
};

export default TransactionSearchBar;
