import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropertyCard from "../../components/properties/PropertyCard";

// Mock data – same as in Properties.jsx (simplified for demonstration)
const propertiesData = [
  { id: 1, address: "451 Birch Avenue", city: "Seattle, WA 98122", beds: 4, baths: 3.5, area: 2850, price: 925000, status: "Active", type: "House", image: "/images/properties/property-1.jpg" },
  { id: 2, address: "789 Oak St", city: "Seattle, WA 98122", beds: 3, baths: 2.5, area: 2850, price: 1150000, status: "Sold", type: "House", image: "/images/properties/property-2.jpg" },
  { id: 3, address: "210 Cedar Ln", city: "Seattle, WA 98122", beds: 4, baths: 3, area: 2850, price: 850000, status: "Active", type: "Villa", image: "/images/properties/property-3.jpg" },
  { id: 4, address: "675 Maple Rd", city: "Seattle, WA 98122", beds: 4, baths: 3.5, area: 2850, price: 1380000, status: "Under Contract", type: "House", image: "/images/properties/property-4.jpg" },
  { id: 5, address: "134 Elm St", city: "Seattle, WA 98122", beds: 4, baths: 3, area: 2850, price: 799000, status: "Active", type: "House", image: "/images/properties/property-5.jpg" },
  { id: 6, address: "321 Pine Dr", city: "Seattle, WA 98122", beds: 4, baths: 3, area: 2850, price: 995000, status: "Sold", type: "Villa", image: "/images/properties/property-6.jpg" },
];

const initialEmpty = {
  address: "",
  city: "",
  beds: "",
  baths: "",
  area: "",
  price: "",
  status: "Active",
  type: "House",
  image: "",
};

const PropertyForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // present only in edit mode
  const [formData, setFormData] = useState(initialEmpty);

  // Load existing data when editing
  useEffect(() => {
    if (mode === "edit" && id) {
      const property = propertiesData.find(p => p.id === Number(id));
      if (property) setFormData({ ...property });
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      // For file inputs, store FileList
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    // Append scalar fields
    const scalarFields = ['title','description','address','city','state','zipCode','country','beds','baths','area','price','status','type'];
    scalarFields.forEach(f => {
      if (formData[f] !== undefined) {
        formDataToSend.append(f, formData[f]);
      }
    });
    // Append images if any
    if (formData.images && formData.images.length) {
      Array.from(formData.images).forEach(file => {
        formDataToSend.append('images', file);
      });
    }
    try {
      if (mode === "add") {
        await fetch('/api/properties', {
          method: 'POST',
          body: formDataToSend,
        });
      } else {
        await fetch(`/api/properties/${id}`, {
          method: 'PUT',
          body: formDataToSend,
        });
      }
      navigate('/properties');
    } catch (err) {
      console.error('Error submitting property:', err);
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
            <input name="title" placeholder="Title" value={formData.title || ''} onChange={handleChange} className="rounded border p-2" required />
            <textarea name="description" placeholder="Description" value={formData.description || ''} onChange={handleChange} className="rounded border p-2" rows={3} />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="rounded border p-2" required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="rounded border p-2" required />
            <input name="state" placeholder="State" value={formData.state || ''} onChange={handleChange} className="rounded border p-2" />
            <input name="zipCode" placeholder="Zip Code" value={formData.zipCode || ''} onChange={handleChange} className="rounded border p-2" />
            <input name="country" placeholder="Country" value={formData.country || ''} onChange={handleChange} className="rounded border p-2" />
            <input name="beds" placeholder="Beds" type="number" value={formData.beds} onChange={handleChange} className="rounded border p-2" required />
            <input name="baths" placeholder="Baths" type="number" step="0.5" value={formData.baths} onChange={handleChange} className="rounded border p-2" required />
            <input name="area" placeholder="Area (sq ft)" type="number" value={formData.area} onChange={handleChange} className="rounded border p-2" required />
            <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="rounded border p-2" required />
            <select name="status" value={formData.status} onChange={handleChange} className="rounded border p-2">
              <option value="Active">Active</option>
              <option value="Sold">Sold</option>
              <option value="Under Contract">Under Contract</option>
            </select>
            <select name="type" value={formData.type} onChange={handleChange} className="rounded border p-2">
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
