import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyStatus from "../../components/properties/PropertyStatus";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/properties/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) {
          throw new Error(`Failed to load property (status ${response.status})`);
        }
        const data = await response.json();
        const prop = data.property;
        setProperty(prop);
        // Choose featuredImage or first image as main
        const main = prop.featuredImage || (prop.images && prop.images[0]) || "/images/placeholder.png";
        setMainImage(main);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[1200px] p-6">
        <p className="text-center py-8 text-[#7b878d]">Loading property...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1200px] p-6">
        <h2 className="text-xl font-bold text-[#34434b]">Error</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/properties")}
          className="mt-4 rounded-md bg-[#3d8f8d] px-4 py-2 text-white"
        >
          Back to list
        </button>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

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
            src={mainImage}
            alt={property.title || property.address}
            className="w-full h-auto rounded-lg object-cover"
          />
          {property.images && property.images.length > 1 && (
            <div className="mt-2 flex space-x-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(img)}
                  className={`border ${img === mainImage ? "border-[#3d8f8d]" : "border-gray-200"} p-1`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="h-16 w-16 object-cover rounded" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#34434b]">
              {property.title || `${property.address}, ${property.city}`}
            </h2>
            <p className="text-gray-600 mb-2">
              {property.address}, {property.city}
            </p>
            <p className="text-xl font-semibold text-[#34434b] mb-2">
              ${property.price?.toLocaleString()}
            </p>
            <p className="text-sm text-[#7b878d] mb-2">
              {property.propertyType} • {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} {property.areaUnit}
            </p>
            <PropertyStatus status={property.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
