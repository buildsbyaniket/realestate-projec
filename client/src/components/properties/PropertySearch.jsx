// src/components/properties/PropertySearch.jsx

import { FiSearch } from "react-icons/fi";

const PropertySearch = ({ search, setSearch }) => {
  return (
    <div className="relative w-full sm:w-[230px]">
      <FiSearch
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search properties..."
        className="h-10 w-full rounded-lg border border-[#dce5e7] bg-white pl-9 pr-3 text-xs text-[#33434b] outline-none transition focus:border-[#56aaa8] focus:ring-2 focus:ring-[#56aaa8]/10"
      />
    </div>
  );
};

export default PropertySearch;