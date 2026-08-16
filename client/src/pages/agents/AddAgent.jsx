import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiUserCheck, FiSave, FiHome, FiTrendingUp, FiStar } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../utils/api";
const AddAgent = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    role: "Senior Property Agent",
    email: "",
    phone: "",
    location: "",
    department: "Residential",
    status: "active",
    avatar: "",
    managedProperties: 0,
    propertiesSold: 0,
    rating: 0,
    initials: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Ensure we have a valid token before attempting to create an agent
    if (!token) {
      navigate('/login');
      return;
    }
    console.log('Submitting agent with token:', token);
    e.preventDefault();
    try {
      const res = await apiFetch('/api/agents', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        // unauthorized – redirect to login
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        console.error('Create agent failed, status:', res.status, 'response:', errData);
        alert(errData.message || 'Failed to create agent');
        return;
      }
      // after successful creation, go back to agents list
      navigate("/agents");
    } catch (err) {
      console.error(err);
      alert(err.message || "Unexpected error");
    }
  };

  return (
    <div className="min-h-full bg-[#f7f9fa] text-[#26343c] p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Agent</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-xl">
        <div className="flex items-center gap-2">
          <FiUser className="text-[#148f8c]" />
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiUserCheck className="text-[#148f8c]" />
          <input
            name="role"
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiMail className="text-[#148f8c]" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-[#148f8c]" />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin className="text-[#148f8c]" />
          <input
            name="location"
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiUserCheck className="text-[#148f8c]" />
          <input
            name="department"
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <FiUserCheck className="text-[#148f8c]" />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        {/* NEW FIELDS */}
        {/* Avatar URL */}
        <div className="flex items-center gap-2">
          <FiUserCheck className="text-[#148f8c]" />
          <input
            name="avatar"
            type="text"
            placeholder="Profile picture URL"
            value={form.avatar}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
          />
        </div>

        {/* Managed Properties */}
        <div className="flex items-center gap-2">
          <FiHome className="text-[#148f8c]" />
          <input
            name="managedProperties"
            type="number"
            min="0"
            placeholder="Managed properties"
            value={form.managedProperties}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
          />
        </div>

        {/* Properties Sold */}
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-[#148f8c]" />
          <input
            name="propertiesSold"
            type="number"
            min="0"
            placeholder="Properties sold"
            value={form.propertiesSold}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <FiStar className="text-[#148f8c]" />
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Rating (0‑5)"
            value={form.rating}
            onChange={handleChange}
            className="flex-1 rounded-xl border border-[#dce4e7] px-4 py-3 text-sm focus:outline-none focus:border-[#6bc3c1]"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#148f8c] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[#117c79] transition"
        >
          <FiSave />
          Save Agent
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
