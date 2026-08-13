// src/components/properties/PropertyGrid.jsx

import PropertyCard from "./PropertyCard";

const PropertyGrid = ({ properties, onView, onEdit }) => {
  if (properties.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-[#cfdadd] bg-white">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-[#56636a]">
            No properties found
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onView={onView}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;