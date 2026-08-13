import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      console.log("Sending registration request...");

      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      console.log("Register response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully!");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof TypeError) {
        setError(
          "Unable to connect to the server. Ensure the backend is running and the proxy is configured."
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8f9] px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#30464d] text-2xl text-white shadow-lg">
            P
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#26343c]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#718087]">
            Create your PropManage account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#dce5e8] bg-white p-8 shadow-sm">
          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#26343c]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
                className="w-full rounded-xl border border-[#dce4e7] px-5 py-3.5 text-sm text-[#34424a] outline-none transition placeholder:text-[#9aa5aa] focus:border-[#6bc3c1] focus:ring-2 focus:ring-[#6bc3c1]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#26343c]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-xl border border-[#dce4e7] px-5 py-3.5 text-sm text-[#34424a] outline-none transition placeholder:text[#9aa5aa] focus:border-[#6bc3c1] focus:ring-2 focus:ring-[#6bc3c1]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#26343c]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-xl border border-[#dce4e7] px-5 py-3.5 text-sm text-[#34424a] outline-none transition placeholder:text[#9aa5aa] focus:border-[#6bc3c1] focus:ring-2 focus:ring-[#6bc3c1]/20 disabled:bg-gray-100"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#26343c]"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re‑enter your password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-xl border border-[#dce4e7] px-5 py-3.5 text-sm text-[#34424a] outline-none transition placeholder:text[#9aa5aa] focus:border-[#6bc3c1] focus:ring-2 focus:ring-[#6bc3c1]/20 disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#148f8c] px-5 py-3 text-white font-semibold hover:bg-[#117c79] transition"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#718087]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#148f8c] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;