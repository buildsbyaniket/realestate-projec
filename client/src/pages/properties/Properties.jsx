// src/pages/properties/Properties.jsx
import React, { useMemo, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import PropertyFilters from "../../components/properties/PropertyFilters";
import PropertyGrid from "../../components/properties/PropertyGrid";
import { apiFetch } from "../../utils/api";

const Properties = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams({
          page: currentPage,
          limit: 10,
        });
        const response = await apiFetch(`/api/properties?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch properties (status ${response.status})`);
        }
        const data = await response.json();
        setProperties(data.properties || []);
        setTotalPages(data.pages || 1);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [currentPage, location.state?.refresh]);

  // Apply client‑side filters (search, status, type) to the fetched data
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.address?.toLowerCase().includes(search.toLowerCase()) ||
        property.city?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || property.status === statusFilter;
      const matchesType = propertyType === "All" || property.type === propertyType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [properties, search, statusFilter, propertyType]);

  const handleView = (property) => {
    const id = property._id || property.id;
    navigate(`/properties/${id}`);
  };

  const handleEdit = (property) => {
    const id = property._id || property.id;
    navigate(`/properties/${id}/edit`);
  };

  const handleAddProperty = () => {
    if (user?.role !== "admin") {
      alert("Only administrators can add new properties.");
      return;
    }
    navigate(`/properties/add`);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-[25px] font-bold tracking-tight text-[#34434b]">Properties</h1>
        <p className="mt-1 text-xs text-[#7b878d]">Manage and monitor all your properties.</p>
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

      {/* Loading / Error */}
      {loading && <p className="text-center py-8 text-[#7b878d]">Loading properties...</p>}
      {error && <p className="text-center py-8 text-red-600">{error}</p>}

      {/* Property Grid */}
      {!loading && !error && (
        <>
          <PropertyGrid properties={filteredProperties} onView={handleView} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <button
              className="flex h-8 items-center gap-1 rounded-md border border-[#dce5e7] bg-white px-3 text-[10px] text-[#7b878d] transition hover:bg-[#f3f7f7]"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <FiChevronLeft size={13} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              Next <FiChevronRight size={13} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Properties;