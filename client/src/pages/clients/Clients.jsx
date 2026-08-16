// Clients.jsx – now loads real data from the backend and supports adding a new client
import React, { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiMoreVertical,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Clients = () => {
  // ----- State management -----
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    clientType: "buyer",
    status: "lead",
    budgetMin: 0,
    budgetMax: 0,
  });

  // ----- Helper: fetch clients -----
  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Redirecting to login page.");
        window.location = "/login";
        return;
      }
      const res = await apiFetch('/api/clients', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          window.location = "/login";
          return;
        }
        const text = await res.text();
        throw new Error(text || "Failed to fetch clients");
      }
      const data = await res.json();
      setClients(data.clients || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ----- Helper: create client -----
  const createClient = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Redirecting to login page.");
        window.location = "/login";
        return;
      }
      const res = await apiFetch('/api/clients', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) {
          if (res.status === 401) {
            alert("Session expired. Please log in again.");
            window.location = "/login";
            return;
          }
          if (res.status === 409) {
            const errData = await res.json();
            alert(errData.message || "Client with this email already exists.");
            return;
          }
          const text = await res.text();
          throw new Error(text || "Failed to create client");
        }
      // Refresh list after successful creation
      await fetchClients();
      setShowAddClient(false);
      setNewClient({
        name: "",
        email: "",
        phone: "",
        clientType: "buyer",
        status: "lead",
        budgetMin: 0,
        budgetMax: 0,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ----- Load clients on component mount -----
  useEffect(() => {
    fetchClients();
  }, []);

  // ----- Filtering logic (same as before) -----
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const newClients = 3; // placeholder for dashboard stats

  return (
    <div className="w-full animate-[fadeIn_0.4s_ease-out]">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#26353d]">Clients</h1>
          <p className="mt-1 text-sm text-[#7b878d]">Manage and monitor all your real estate clients.</p>
        </div>
        <button
          onClick={() => setShowAddClient(true)}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#56aaa8] px-5 text-sm font-semibold text-white shadow-lg shadow-[#56aaa8]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#479795]"
        >
          <FiPlus size={18} /> Add New Client
        </button>
      </div>

      {/* STATISTICS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="group rounded-2xl border border-[#dfe7e9] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a969b]">Total Clients</p>
              <h2 className="mt-2 text-3xl font-bold text-[#29373e]">{totalClients}</h2>
              <p className="mt-2 text-xs text-[#7b878d]">Registered in your system</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f7f6] text-[#56aaa8] transition-transform duration-300 group-hover:scale-110">
              <FiUsers size={25} />
            </div>
          </div>
        </div>
        <div className="group rounded-2xl border border-[#dfe7e9] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a969b]">Active Clients</p>
              <h2 className="mt-2 text-3xl font-bold text-[#29373e]">{activeClients}</h2>
              <p className="mt-2 text-xs text-[#56aaa8]">Currently active</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f7f6] text-[#56aaa8] transition-transform duration-300 group-hover:scale-110">
              <FiUserCheck size={25} />
            </div>
          </div>
        </div>
        <div className="group rounded-2xl border border-[#dfe7e9] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8a969b]">New This Month</p>
              <h2 className="mt-2 text-3xl font-bold text-[#29373e]">+{newClients}</h2>
              <p className="mt-2 text-xs text-[#7b878d]">New client registrations</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1ecff] text-[#7d63c8] transition-transform duration-300 group-hover:scale-110">
              <FiUserPlus size={25} />
            </div>
          </div>
        </div>
      </div>

      {/* CLIENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe7e9] bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-[#e7edef] p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#29373e]">Client Directory</h2>
            <p className="mt-1 text-xs text-[#8a969b]">{filteredClients.length} clients found</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}
            <div className="relative">
              <FiSearch size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#95a0a5]" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-[#dce5e7] bg-[#fbfcfc] pl-10 pr-4 text-sm text-[#334148] outline-none transition-all placeholder:text-[#a4afb4] focus:border-[#56aaa8] focus:ring-2 focus:ring-[#56aaa8]/10 sm:w-60"
              />
            </div>
            {/* FILTER */}
            <div className="relative">
              <FiFilter size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7f8b91]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-[#dce5e7] bg-white py-2 pl-9 pr-9 text-sm font-medium text-[#526169] outline-none focus:border-[#56aaa8]"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-[#edf1f2] bg-[#fafcfc]">
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#879398]">Client</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#879398]">Contact</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#879398]">Location</th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-[#879398]">Properties</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#879398]">Type</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-[#879398]">Status</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-[#879398]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-[#56636a]">
                    Loading clients…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-red-600">
                    {error}
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client._id || client.id}
                    className="border-b border-[#edf1f2] transition-colors duration-200 last:border-0 hover:bg-[#f8fbfb]"
                  >
                    {/* CLIENT */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${client.color || "bg-rose-100 text-rose-600"}`}
                        >
                          {client.initials || client.name?.[0]}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-[#334148]">{client.name}</p>
                          <p className="mt-0.5 text-xs text-[#98a2a6]">Joined {client.joined || "—"}</p>
                        </div>
                      </div>
                    </td>
                    {/* CONTACT */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#56636a]">{client.email}</p>
                      <p className="mt-1 text-xs text-[#98a2a6]">{client.phone}</p>
                    </td>
                    {/* LOCATION */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#56636a]">
                        <FiMapPin size={15} className="text-[#8e999e]" />
                        {client.location}
                      </div>
                    </td>
                    {/* PROPERTIES */}
                      <td className="px-6 py-4 text-center">
                        {client.properties && client.properties.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-[#4e9f9d]">
                            {client.properties.map((prop) => (
                              <li key={prop._id}>{prop.title || prop.name || 'Property'}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-[#eef6f6] px-2 py-1 text-xs font-bold text-[#4e9f9d]">
                            0
                          </span>
                        )}
                      </td>
                    {/* TYPE */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${client.type === "Buyer" ? "bg-[#e8f7f6] text-[#4e9f9d]" : "bg-[#f1ecff] text-[#7d63c8]"}`}
                      >
                        {client.type}
                      </span>
                    </td>
                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold ${client.status === "Active" ? "text-green-600" : client.status === "Pending" ? "text-amber-600" : "text-gray-600"}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <Link to={`/clients/${client._id}`} className="text-sm font-medium text-[#56aaa8] hover:underline">
                        View
                      </Link>
                      <FiMoreVertical className="inline-block ml-2 text-[#b0b8bc]" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD CLIENT MODAL */}
      {showAddClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#26353d]">Add New Client</h3>
              <button onClick={() => setShowAddClient(false)} className="text-[#7b878d] hover:text-[#26353d]">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={createClient} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="rounded-xl border border-[#dce5e7] p-2"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="rounded-xl border border-[#dce5e7] p-2"
              />
              <input
                type="text"
                placeholder="Phone"
                required
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                className="rounded-xl border border-[#dce5e7] p-2"
              />
              <select
                value={newClient.clientType}
                onChange={(e) => setNewClient({ ...newClient, clientType: e.target.value })}
                className="rounded-xl border border-[#dce5e7] p-2"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="tenant">Tenant</option>
                <option value="investor">Investor</option>
              </select>
              <select
                value={newClient.status}
                onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                className="rounded-xl border border-[#dce5e7] p-2"
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="converted">Converted</option>
              </select>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddClient(false)}
                  className="rounded-xl bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#56aaa8] px-4 py-2 text-sm font-medium text-white hover:bg-[#479795]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;