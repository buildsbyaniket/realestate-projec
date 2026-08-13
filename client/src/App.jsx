// src/App.jsx

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";

// Layout
import DashboardLayout from "./components/layout/Dashboardlayout";

// Authentication pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Authentication Context & Guards
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/properties/Properties";
import Agents from "./pages/agents/Agents";
import AddAgent from "./pages/agents/AddAgent";
import AgentProfile from "./pages/agents/AgentProfile";
import EditAgent from "./pages/agents/EditAgent";
import Clients from "./pages/clients/Clients";
import Reports from "./pages/reports/Reports";
import PropertyDetail from "./pages/properties/PropertyDetail";
import PropertyForm from "./pages/properties/PropertyForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Settings from "./pages/settings/Setting.jsx";
/* =========================================================
   SETTINGS PAGE
========================================================= */






/* =========================================================
   LOGOUT PAGE
========================================================= */

import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center bg-[#f5f8f9] p-8">
      <div className="w-full max-w-md rounded-2xl border border-[#dce5e8] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7f6] text-3xl">
          👋
        </div>
        <h1 className="mt-6 text-2xl font-bold text-[#26343c]">You have been logged out</h1>
        <p className="mt-2 text-sm text-[#718087]">Thank you for using PropManage.</p>
        <a href="/login" className="mt-6 inline-flex rounded-xl bg-[#30464d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#263b42]">Sign In Again</a>
      </div>
    </div>
  );
};

const DashboardRoutes = ({
  isSidebarOpen,
  onSidebarClose,
  onMenuClick,
}) => {
  return (
    <DashboardLayout
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={onSidebarClose}
      onMenuClick={onMenuClick}
    >

      <Routes>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Properties */}
        <Route
          path="/properties"
          element={<Properties />}
        />
        {/* Property Detail */}
        <Route
          path="/properties/:id"
          element={<PropertyDetail />}
        />
        {/* Add Property (admin only) */}
        <Route
          path="/properties/add"
          element={<AdminRoute><PropertyForm mode="add" /></AdminRoute>}
        />
        {/* Edit Property (admin only) */}
        <Route
          path="/properties/:id/edit"
          element={<AdminRoute><PropertyForm mode="edit" /></AdminRoute>}
        />

          {/* Admin‑only routes for managing agents */}
          <Route
            path="/agents/add"
            element={<AdminRoute><AddAgent /></AdminRoute>}
          />
          <Route
            path="/agents"
            element={<Agents />}
          />
          
          <Route
            path="/agents/:id"
            element={<AgentProfile />}
          />
          <Route
            path="/agents/:id/edit"
            element={<AdminRoute><EditAgent /></AdminRoute>}
          />

        {/* Clients */}
        <Route
          path="/clients"
          element={<Clients />}
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />
        {/* Unknown dashboard URL */}
          <Route
            path="/logout"
            element={<Logout />}
          />


      </Routes>

    </DashboardLayout>
  );
};

/* =========================================================
   APP
========================================================= */

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* PUBLIC AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* DASHBOARD APPLICATION */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardRoutes
                  isSidebarOpen={isSidebarOpen}
                  onSidebarClose={closeSidebar}
                  onMenuClick={toggleSidebar}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;