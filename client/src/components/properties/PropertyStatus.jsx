// src/components/properties/PropertyStatus.jsx

const PropertyStatus = ({ status }) => {
  const statusStyles = {
    Active: "bg-[#e7f5f3] text-[#3f8d8b]",
    Sold: "bg-[#edf6ee] text-[#5a9567]",
    "Under Contract": "bg-[#f3f1e8] text-[#8a7b4b]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default PropertyStatus;