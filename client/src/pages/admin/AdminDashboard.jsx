// client/src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Using proxy-relative paths for API calls

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || "Failed to load users");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "admin" }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh list
        fetchUsers();
        alert("User promoted to admin");
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-[#f5f8f9] min-h-screen">
      <h1 className="mb-4 text-2xl font-bold text-[#26343c]">Admin Dashboard</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#e8f7f6]">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b border-gray-200">
              <td className="p-2">{u.email}</td>
              <td className="p-2 capitalize">{u.role}</td>
              <td className="p-2">
                {u.role !== "admin" && (
                  <button
                    className="rounded bg-teal-500 px-3 py-1 text-sm text-white hover:bg-teal-600"
                    onClick={() => promoteToAdmin(u._id)}
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
