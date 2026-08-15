import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropertyCard from "../../components/properties/PropertyCard";

// Initial empty form values
const initialEmpty = {
  title: "",
  description: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  price: "",
  status: "Available",
  propertyType: "House",
  images: null,
  image: "",
};

const PropertyForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // present only in edit mode
  const [formData, setFormData] = useState(initialEmpty);

  // Load existing data when editing
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProperty = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`/api/properties/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (!response.ok) throw new Error(`Failed to fetch property (status ${response.status})`);
          const data = await response.json();
          // Backend returns { property: {...} }
          setFormData(data.property);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProperty();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const fileList = files;
      const preview = fileList && fileList.length > 0 ? URL.createObjectURL(fileList[0]) : "";
      setFormData((prev) => ({ ...prev, [name]: fileList, image: preview }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = mode === "add" ? "/api/properties" : `/api/properties/${id}`;
      const method = mode === "add" ? "POST" : "PUT";

      if (formData.images && formData.images.length > 0) {
        const form = new FormData();
        const fields = [
          "title",
          "description",
          "address",
          "city",
          "state",
          "zipCode",
          "country",
          "bedrooms",
          "bathrooms",
          "area",
          "price",
          "status",
          "propertyType",
        ];
        fields.forEach((f) => {
          if (formData[f] !== undefined) form.append(f, formData[f]);
        });
        Array.from(formData.images).forEach((file) => {
          form.append("images", file);
        });
        await fetch(url, {
          method,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        });
      } else {
        const payload = {};
        const fields = [
          "title",
          "description",
          "address",
          "city",
          "state",
          "zipCode",
          "country",
          "bedrooms",
          "bathrooms",
          "area",
          "price",
          "status",
          "propertyType",
        ];
        fields.forEach((f) => {
          if (formData[f] !== undefined) payload[f] = formData[f];
        });
        await fetch(url, {
          method,
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      navigate("/properties", { state: { refresh: Date.now() } });
    } catch (err) {
      console.error("Error submitting property:", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[800px] p-6">
      <button
        onClick={() => navigate("/properties")}
        className="mb-4 rounded-md bg-[#3d8f8d] px-4 py-2 text-white"
      >
        ← Back to Properties
      </button>
      <h2 className="mb-4 text-2xl font-bold text-[#34434b]">
        {mode === "add" ? "Add New Property" : "Edit Property"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} className="rounded border p-2" required />
          <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} className="rounded border p-2" rows={3} />
          <input name="address" placeholder="Address" value={formData.address || ""} onChange={handleChange} className="rounded border p-2" required />
          <input name="city" placeholder="City" value={formData.city || ""} onChange={handleChange} className="rounded border p-2" required />
          <input name="state" placeholder="State" value={formData.state || ""} onChange={handleChange} className="rounded border p-2" />
          <input name="zipCode" placeholder="Zip Code" value={formData.zipCode || ""} onChange={handleChange} className="rounded border p-2" />
          <input name="country" placeholder="Country" value={formData.country || ""} onChange={handleChange} className="rounded border p-2" />
          <input name="bedrooms" placeholder="Bedrooms" type="number" value={formData.bedrooms || ""} onChange={handleChange} className="rounded border p-2" required />
          <input name="bathrooms" placeholder="Bathrooms" type="number" step="0.5" value={formData.bathrooms || ""} onChange={handleChange} className="rounded border p-2" required />
          <input name="area" placeholder="Area (sq ft)" type="number" value={formData.area || ""} onChange={handleChange} className="rounded border p-2" required />
          <input name="price" placeholder="Price" type="number" value={formData.price || ""} onChange={handleChange} className="rounded border p-2" required />
          <select name="status" value={formData.status} onChange={handleChange} className="rounded border p-2">
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
          </select>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="rounded border p-2">
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
          <input name="images" type="file" multiple accept="image/*" onChange={handleChange} className="rounded border p-2" />
        </div>
        <button type="submit" className="mt-4 rounded-md bg-[#3d8f8d] px-6 py-2 text-white">
          {mode === "add" ? "Create Property" : "Save Changes"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#34434b]">Preview</h3>
        <PropertyCard property={formData} onView={() => {}} onEdit={() => {}} />
      </div>
    </div>
  );
};

export default PropertyForm;
