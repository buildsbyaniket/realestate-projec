// src/pages/auth/Login.jsx

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHome,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);

      await login(
        formData.email.trim().toLowerCase(),
        formData.password
      );
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleAppleLogin = () => {
    console.log("Apple login");
  };

  return (
    <div className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4 sm:p-6 lg:p-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl min-h-[680px] bg-white rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(20,60,50,0.12)] border border-[#e8efec] flex flex-col lg:flex-row">

        {/* =====================================================
            LEFT SIDE - REAL ESTATE VISUAL
        ====================================================== */}
        <div className="relative hidden lg:flex lg:w-[52%] overflow-hidden bg-[#123b35]">

          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=90"
            alt="Luxury modern property"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#092c27]/90 via-[#0b4038]/55 to-[#0c211e]/80" />

          {/* Decorative glow */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#43c7a7]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-[#54d8bc]/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14 text-white">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <FiHome size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  PropManage
                </h2>
                <p className="text-[11px] text-white/65">
                  Smart Property Management
                </p>
              </div>
            </div>

            {/* Main Message */}
            <div className="max-w-xl">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-[#62e0bc] animate-pulse" />
                <span className="text-xs font-medium text-white/85">
                  Trusted Property Platform
                </span>
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight">
                Find a place
                <br />
                <span className="text-[#69dfc0]">
                  you'll love.
                </span>
              </h1>

              <p className="mt-6 text-sm xl:text-base leading-7 text-white/70 max-w-md">
                Discover premium properties, connect with trusted
                agents and manage your real-estate journey from
                one powerful platform.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-3">

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <FiCheckCircle size={15} className="text-[#69dfc0]" />
                  </div>

                  <span className="text-sm text-white/80">
                    Verified properties and agents
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <FiCheckCircle size={15} className="text-[#69dfc0]" />
                  </div>

                  <span className="text-sm text-white/80">
                    Simple and secure property management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <FiCheckCircle size={15} className="text-[#69dfc0]" />
                  </div>

                  <span className="text-sm text-white/80">
                    Connect with professional agents
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between border-t border-white/15 pt-6">

              <div className="flex items-center gap-2 text-xs text-white/55">
                <FiShield size={14} />
                Secure & trusted platform
              </div>

              <div className="text-xs text-white/45">
                © {new Date().getFullYear()} PropManage
              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE - LOGIN
        ====================================================== */}
        <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-3 mb-10">

              <div className="w-10 h-10 rounded-xl bg-[#e7f7f2] text-[#159b82] flex items-center justify-center">
                <FiHome size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#173b34]">
                  PropManage
                </h2>

                <p className="text-[10px] text-gray-500">
                  Smart Property Management
                </p>
              </div>

            </div>

            {/* Heading */}
            <div className="mb-8">

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#159b82] mb-3">
                Welcome Back
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#18332f] tracking-tight">
                Sign in to your
                <br />
                account
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#74827f]">
                Enter your details to access your PropManage
                dashboard and properties.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#344541] mb-2"
                >
                  Email address
                </label>

                <div className="relative">

                  <FiMail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#82918d] pointer-events-none"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dce6e2] bg-[#fbfdfc] text-sm text-[#20332f] outline-none transition-all placeholder:text-[#a0aaa7] focus:border-[#159b82] focus:ring-4 focus:ring-[#159b82]/10"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#344541]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#159b82] hover:text-[#0d7764] transition-colors"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <FiLock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#82918d] pointer-events-none"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-[#dce6e2] bg-[#fbfdfc] text-sm text-[#20332f] outline-none transition-all placeholder:text-[#a0aaa7] focus:border-[#159b82] focus:ring-4 focus:ring-[#159b82]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#82918d] hover:text-[#159b82] transition-colors"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Sign In */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full h-12 rounded-xl bg-[#159b82] hover:bg-[#10816c] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-[#159b82]/20 hover:shadow-xl hover:shadow-[#159b82]/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <FiArrowRight
                      size={17}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}

              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-[#e4ebe8]" />

              <span className="text-xs text-[#8b9794]">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-[#e4ebe8]" />

            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="h-11 rounded-xl border border-[#dce6e2] bg-white hover:bg-[#f8fbfa] flex items-center justify-center gap-2 text-sm font-medium text-[#354440] transition-colors"
              >
                <FcGoogle size={19} />
                Google
              </button>

              <button
                type="button"
                onClick={handleAppleLogin}
                className="h-11 rounded-xl border border-[#dce6e2] bg-white hover:bg-[#f8fbfa] flex items-center justify-center gap-2 text-sm font-medium text-[#354440] transition-colors"
              >
                <FaApple size={19} />
                Apple
              </button>

            </div>

            {/* Register */}
            <div className="text-center mt-8">

              <p className="text-sm text-[#74827f]">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-[#159b82] hover:text-[#0d7764] transition-colors"
                >
                  Create account
                </Link>
              </p>

            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-7 text-[11px] text-[#9aa6a3]">
              <FiShield size={13} />
              Your information is protected and secure
            </div>

          </div>
        </div>

      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes loginPageEnter {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            body {
              background: #f7faf9;
            }
          }
        `}
      </style>

    </div>
  );
};

export default Login;