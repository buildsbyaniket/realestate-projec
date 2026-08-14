import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiChevronLeft, FiUser, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const ClientDetails = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to fetch client");
        }
        const data = await res.json();
        setClient(data.client);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchClient();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f5f8f9] p-8">
        <p className="text-sm text-[#56636a]">Loading client details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f5f8f9] p-8">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link to="/clients" className="text-[#56aaa8] hover:underline flex items-center">
          <FiChevronLeft size={20} />
          <span className="ml-1">Back to Clients</span>
        </Link>
        <h1 className="text-2xl font-bold text-[#26353d]">Client Details</h1>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-[#dfe7e9] bg-white shadow-sm p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-xl ${client.color || "bg-rose-100 text-rose-600"}`}
          >
            <span className="text-lg font-bold text-white">{client.initials || client.name?.[0]}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#29373e]">{client.name}</h2>
            <p className="mt-1 text-sm text-[#7b878d]">{client.email}</p>
            <p className="mt-1 text-sm text-[#7b878d]">{client.phone}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8a969b]">Status</p>
            <p className="mt-1 text-sm text-[#56636a] capitalize">{client.status}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-[#8a969b]">Type</p>
            <p className="mt-1 text-sm text-[#56636a] capitalize">{client.type}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-[#8a969b]">Joined</p>
            <p className="mt-1 text-sm text-[#56636a]">{client.joined ? new Date(client.joined).toLocaleDateString() : "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-[#8a969b]">Location</p>
            <p className="mt-1 text-sm text-[#56636a]">{client.city}, {client.state}, {client.country}</p>
          </div>
        </div>

        {/* Agent Section */}
        {client.agent && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase text-[#8a969b] mb-2">Assigned Agent</p>
            <div className="flex items-center gap-3">
              <FiUser className="text-[#56aaa8]" size={20} />
              <div>
                <p className="font-medium text-[#29373e]">{client.agent.name}</p>
                <p className="text-sm text-[#7b878d]">{client.agent.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Properties Section */}
        {client.properties && client.properties.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase text-[#8a969b] mb-2">Properties</p>
            <ul className="space-y-2">
              {client.properties.map((prop) => (
                <li key={prop._id}>
                  <Link
                    to={`/properties/${prop._id}`}
                    className="inline-flex items-center gap-2 text-[#56aaa8] hover:underline"
                  >
                    {prop.title || prop.address || "Property"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Admin actions */}
        {user?.role === "admin" && (
          <div className="mt-6 flex gap-4">
            <Link
              to={`/clients/${client._id}/edit`}
              className="rounded-xl bg-[#56aaa8] px-4 py-2 text-sm font-medium text-white hover:bg-[#479795]"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
