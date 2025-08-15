"use client";

interface SearchBarProps {
  value?: string;
  placeholderText?: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  placeholderText,
  onChange,
}) => {
  return (
    <div className="relative w-full flex">
      <div className="placeholder-gray-800 border flex rounded-lg py-2 px-2">
        <input
          type="text"
          name="search"
          placeholder={placeholderText}
          className="w-max-[300px] px-2 outline-none bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="pr-2">
          <img
            src="images/icon-search.svg"
            className="cursor-pointer"
            width="20"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
