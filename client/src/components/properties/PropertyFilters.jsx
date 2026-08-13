// src/components/properties/PropertyFilters.jsx

import { FiChevronDown } from "react-icons/fi";
import PropertySearch from "./PropertySearch";

const PropertyFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  propertyType,
  setPropertyType,
  onAddProperty,
}) => {
  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <PropertySearch search={search} setSearch={setSearch} />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 appearance-none rounded-lg border border-[#dce5e7] bg-white px-3 pr-8 text-xs text-[#536168] outline-none transition hover:border-[#56aaa8]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
            <option value="Under Contract">Under Contract</option>
          </select>

          <FiChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="h-10 appearance-none rounded-lg border border-[#dce5e7] bg-white px-3 pr-8 text-xs text-[#536168] outline-none transition hover:border-[#56aaa8]"
          >
            <option value="All">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>

          <FiChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Add Property */}
        <button
          onClick={onAddProperty}
          className="h-10 rounded-lg bg-[#3d8f8d] px-4 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#347d7b] hover:shadow-md"
        >
          + Add New Property
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;