import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyStatus from "../../components/properties/PropertyStatus";

// Mock data – same as in Properties page (could be imported)
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

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="mx-auto w-full max-w-[1200px] p-6">
        <h2 className="text-xl font-bold text-[#34434b]">Property not found</h2>
        <button
          onClick={() => navigate("/properties")}
          className="mt-4 rounded-md bg-[#3d8f8d] px-4 py-2 text-white"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] p-6">
      <button
        onClick={() => navigate("/properties")}
        className="mb-4 rounded-md bg-[#3d8f8d] px-4 py-2 text-white"
      >
        ← Back to Properties
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <img
            src={property.image}
            alt={property.address}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#34434b]">{property.address}</h2>
            <p className="text-gray-600 mb-2">{property.city}</p>
            <p className="text-xl font-semibold text-[#34434b] mb-2">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-sm text-[#7b878d] mb-2">
              {property.type} • {property.beds} Beds • {property.baths} Baths • {property.area} sq ft
            </p>
            <PropertyStatus status={property.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
