// src/pages/properties/Properties.jsx

import React, { useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import PropertyFilters from "../../components/properties/PropertyFilters";
import PropertyGrid from "../../components/properties/PropertyGrid";

const propertiesData = [
  {
    id: 1,
    address: "451 Birch Avenue",
    city: "Seattle, WA 98122",
    beds: 4,
    baths: 3.5,
    area: 2850,
    price: 925000,
    status: "Active",
    type: "House",
    image: "/images/properties/property-1.jpg",
  },
  {
    id: 2,
    address: "789 Oak St",
    city: "Seattle, WA 98122",
    beds: 3,
    baths: 2.5,
    area: 2850,
    price: 1150000,
    status: "Sold",
    type: "House",
    image: "/images/properties/property-2.jpg",
  },
  {
    id: 3,
    address: "210 Cedar Ln",
    city: "Seattle, WA 98122",
    beds: 4,
    baths: 3,
    area: 2850,
    price: 850000,
    status: "Active",
    type: "Villa",
    image: "/images/properties/property-3.jpg",
  },
  {
    id: 4,
    address: "675 Maple Rd",
    city: "Seattle, WA 98122",
    beds: 4,
    baths: 3.5,
    area: 2850,
    price: 1380000,
    status: "Under Contract",
    type: "House",
    image: "/images/properties/property-4.jpg",
  },
  {
    id: 5,
    address: "134 Elm St",
    city: "Seattle, WA 98122",
    beds: 4,
    baths: 3,
    area: 2850,
    price: 799000,
    status: "Active",
    type: "House",
    image: "/images/properties/property-5.jpg",
  },
  {
    id: 6,
    address: "321 Pine Dr",
    city: "Seattle, WA 98122",
    beds: 4,
    baths: 3,
    area: 2850,
    price: 995000,
    status: "Sold",
    type: "Villa",
    image: "/images/properties/property-6.jpg",
  },
];

const Properties = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      const matchesSearch =
        property.address.toLowerCase().includes(search.toLowerCase()) ||
        property.city.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || property.status === statusFilter;
      const matchesType = propertyType === "All" || property.type === propertyType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, propertyType]);

  const handleView = (property) => {
    navigate(`/properties/${property.id}`);
  };

  const handleEdit = (property) => {
    navigate(`/properties/${property.id}/edit`);
  };

  const handleAddProperty = () => {
    if (user?.role !== 'admin') {
      alert('Only administrators can add new properties.');
      return;
    }
    navigate(`/properties/add`);
  };
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-[25px] font-bold tracking-tight text-[#34434b]">
          Properties
        </h1>

        <p className="mt-1 text-xs text-[#7b878d]">
          Manage and monitor all your properties.
        </p>
      </div>

      {/* Filters */}
      <PropertyFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        onAddProperty={handleAddProperty}
      />

      {/* Property Grid */}
      <PropertyGrid
        properties={filteredProperties}
        onView={handleView}
        onEdit={handleEdit}
      />

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-1.5">
        <button
          className="flex h-8 items-center gap-1 rounded-md border border-[#dce5e7] bg-white px-3 text-[10px] text-[#7b878d] transition hover:bg-[#f3f7f7]"
          onClick={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
        >
          <FiChevronLeft size={13} />
          Prev
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`h-8 w-8 rounded-md border text-[10px] font-semibold transition ${
              currentPage === page
                ? "border-[#70b5b2] bg-[#edf8f7] text-[#3d8f8d]"
                : "border-[#dce5e7] bg-white text-[#718087] hover:bg-[#f3f7f7]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          className="flex h-8 items-center gap-1 rounded-md border border-[#dce5e7] bg-white px-3 text-[10px] text-[#7b878d] transition hover:bg-[#f3f7f7]"
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
          <FiChevronRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default Properties;