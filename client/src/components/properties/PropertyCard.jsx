// src/components/properties/PropertyCard.jsx

import { FiEdit2 } from "react-icons/fi";
import PropertyStatus from "./PropertyStatus";

const PropertyCard = ({ property, onView, onEdit }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-[#dce5e7] bg-white p-2 shadow-[0_3px_12px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(15,23,42,0.12)]">
      {/* Property Image */}
      <div className="relative h-[135px] overflow-hidden rounded-lg bg-[#eef2f3]">
        <img
          src={property.image}
          alt={property.address}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-1 pb-1 pt-2.5">
        <h3 className="text-[13px] font-bold text-[#34434b]">
          {property.address}
        </h3>

        <p className="mt-0.5 text-[10px] text-[#7b878d]">
          {property.city}
        </p>

        <p className="mt-1 text-[10px] font-medium text-[#65747a]">
          {property.beds} Beds | {property.baths} Baths | {property.area} sq ft
        </p>

        {/* Price + Status */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[15px] font-bold text-[#34434b]">
            ${property.price.toLocaleString()}
          </p>

          <PropertyStatus status={property.status} />
        </div>

        {/* Buttons */}
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button
            onClick={() => onView(property)}
            className="h-8 rounded-md bg-[#3d8f8d] text-[10px] font-semibold text-white transition hover:bg-[#347d7b]"
          >
            View Details
          </button>

          <button
            onClick={() => onEdit(property)}
            className="flex h-8 items-center justify-center gap-1 rounded-md border border-[#7fb4b3] text-[10px] font-semibold text-[#3d7777] transition hover:bg-[#edf7f6]"
          >
            <FiEdit2 size={11} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;