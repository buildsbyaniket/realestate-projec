// src/pages/clients/EditClient.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../utils/api";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiFetch(`/api/clients/${id}`, {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to load client");
        const data = await res.json();
        setClient(data.client || {});
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await apiFetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error("Failed to update client");
      navigate("/clients", { state: { refresh: Date.now() } });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Loading client...</p>;

  return (
    <div className="mx-auto w-full max-w-[800px] p-6">
      <button
        onClick={() => navigate("/clients")}
        className="mb-4 rounded-md bg-[#3d8f8d] px-4 py-2 text-white"
      >
        ← Back to Clients
      </button>
      <h2 className="mb-4 text-2xl font-bold text-[#34434b]">Edit Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={client.name} onChange={handleChange} className="rounded border p-2" required />
        <input name="email" placeholder="Email" type="email" value={client.email} onChange={handleChange} className="rounded border p-2" required />
        <input name="phone" placeholder="Phone" value={client.phone} onChange={handleChange} className="rounded border p-2" />
        <button type="submit" className="rounded-md bg-[#3d8f8d] px-6 py-2 text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditClient;
