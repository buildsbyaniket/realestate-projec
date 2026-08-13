import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiUserCheck, FiSave, FiHome, FiTrendingUp, FiStar } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const EditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    department: "",
    status: "active",
    avatar: "",
    managedProperties: 0,
    propertiesSold: 0,
    rating: 0,
    initials: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing agent data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`http://localhost:5001/api/agents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.agent) {
          const a = data.agent;
          setForm({
            name: a.name || "",
            role: a.jobTitle || "",
            email: a.email || "",
            phone: a.phone || "",
            location: a.location || "",
            department: a.department || "Residential",
            status: a.status || "active",
            avatar: a.avatar || "",
            initials: a.initials || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5001/api/agents/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (!res.ok) {
        const errData = await res.json();
        console.error("Update failed", errData);
        alert(errData.message || "Failed to update agent");
        return;
      }
      navigate("/agents");
    } catch (err) {
      console.error(err);
      alert(err.message || "Unexpected error");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f7f9fa] p-8">
        <p className="text-sm text-[#7b878d]">Loading agent data…</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f7f9fa] text-[#26343c] p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Agent</h1>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAgent;
