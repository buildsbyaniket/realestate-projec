// src/components/properties/PropertyCard.jsx

import { FiEdit2 } from "react-icons/fi";
import PropertyStatus from "./PropertyStatus";
import SafeImage from "../common/SafeImage";
import { ArrowUpRight, MapPin } from "lucide-react";

const PropertyCard = ({ property, onView, onEdit }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-[270px] overflow-hidden">
        <SafeImage
          src={property.featuredImage || (property.images && property.images[0]) || '/images/placeholder.png'}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {property.tag && (
          <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
            {property.tag}
          </div>
        )}
        {/* Bottom info */}
        <div className="absolute bottom-5 left-5 text-white">
          <p className="mb-1 flex items-center gap-1 text-sm text-white/80">
            <MapPin size={14} />
            {property.location}
          </p>
          <h3 className="text-xl font-bold">
            {property.title}
          </h3>
        </div>
        {/* View button */}
        <button
          type="button"
          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100"
          onClick={() => onView && onView(property)}
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-500">{property.price?.toLocaleString() ?? property.price}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {property.status ?? "Available"}
          </span>
        </div>
        <div className="grid grid-cols-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-800">{property.beds}</p>
            <p>Beds</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">{property.baths}</p>
            <p>Baths</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">{property.sqft}</p>
            <p>sq ft</p>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button
            onClick={() => onView && onView(property)}
            className="h-8 rounded-md bg-[#3d8f8d] text-xs font-semibold text-white transition hover:bg-[#347d7b]"
          >
            View Details
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(property)}
              className="flex h-8 items-center justify-center gap-1 rounded-md border border-[#7fb4b3] text-xs font-semibold text-[#3d7777] transition hover:bg-[#edf7f6]"
            >
              <FiEdit2 size={11} />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;