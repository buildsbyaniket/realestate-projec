import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Keep your existing registration API here.
      // Example:
      //
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     phone: formData.phone,
      //     password: formData.password,
      //   }),
      // });

      console.log("Registration data:", formData);

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6faf9] flex">

      {/* =====================================================
          LEFT SIDE - REAL ESTATE VISUAL
      ====================================================== */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90"
          alt="Luxury property"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-teal-900/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 w-fit">

            <div className="w-11 h-11 rounded-xl bg-teal-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center">

              <svg
                className="w-6 h-6 text-teal-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21v-6h6v6"
                />
              </svg>

            </div>

            <span className="text-2xl font-bold">
              Prop<span className="text-teal-300">Manage</span>
            </span>

          </Link>


          {/* Main message */}
          <div className="max-w-xl">

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">

              <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse" />

              <span className="text-sm font-medium">
                Premium Property Management
              </span>

            </div>

            <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Find a place
              <br />
              <span className="text-teal-300">
                you'll love.
              </span>
            </h1>

            <p className="text-lg text-white/80 leading-8 max-w-lg">
              Join PropManage and discover properties, connect with
              trusted agents, and make your next property decision
              with confidence.
            </p>

          </div>


          {/* Bottom stats */}
          <div className="flex gap-10">

            <div>
              <p className="text-3xl font-bold">1,200+</p>
              <p className="text-sm text-white/60 mt-1">
                Properties
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">850+</p>
              <p className="text-sm text-white/60 mt-1">
                Happy Clients
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">45+</p>
              <p className="text-sm text-white/60 mt-1">
                Cities
              </p>
            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          RIGHT SIDE - REGISTER FORM
      ====================================================== */}
      <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-lg">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">

            <Link
              to="/"
              className="flex items-center gap-2"
            >

              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">

                <svg
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21v-6h6v6"
                  />
                </svg>

              </div>

              <span className="text-xl font-bold text-slate-800">
                Prop<span className="text-teal-500">Manage</span>
              </span>

            </Link>

          </div>


          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-7 sm:p-9">

            {/* Header */}
            <div className="mb-8">

              <p className="text-sm font-semibold text-teal-500 mb-2">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Create your account
              </h2>

              <p className="text-slate-500 mt-2">
                Join PropManage and start exploring properties.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />

              </div>


              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />

              </div>


              {/* Phone */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />

              </div>


              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Confirm Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* Terms */}
              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 accent-teal-500"
                />

                <p className="text-sm text-slate-500 leading-5">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-teal-600 font-medium hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-teal-600 font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-[0.99] text-white font-semibold text-lg shadow-lg shadow-teal-500/20 transition-all duration-300 disabled:opacity-60"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>


            {/* Login */}
            <div className="relative my-7">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-400">
                  Already have an account?
                </span>
              </div>

            </div>


            <Link
              to="/login"
              className="block w-full text-center py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-teal-400 hover:text-teal-500 transition-all"
            >
              Login to PropManage
            </Link>

          </div>


          {/* Back */}
          <div className="text-center mt-6">

            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-teal-500 transition-colors"
            >
              ← Back to PropManage
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;