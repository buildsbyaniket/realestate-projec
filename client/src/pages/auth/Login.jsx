// src/pages/auth/Login.jsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
const API_URL = import.meta.env.VITE_API_URL;
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.email || !formData.password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      await login(formData.email.trim().toLowerCase(), formData.password);
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleAppleLogin = () => {
    console.log("Apple login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 12% 8%, rgba(87,190,255,0.40), transparent 32%), radial-gradient(circle at 90% 90%, rgba(74,207,198,0.20), transparent 32%), linear-gradient(135deg, #e7f7ff 0%, #f6fbff 48%, #effcfb 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          top: "-120px",
          left: "-80px",
          borderRadius: "50%",
          background: "rgba(75,174,255,0.20)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          right: "-100px",
          bottom: "-120px",
          borderRadius: "50%",
          background: "rgba(53,190,177,0.18)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "448px",
          padding: "25px 40px 36px",
          borderRadius: "15px",
          border: "1px solid rgba(255,255,255,0.80)",
          background: "rgba(255,255,255,0.74)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 25px 60px rgba(30,65,90,0.14), 0 5px 20px rgba(30,65,90,0.08)",
          boxSizing: "border-box",
          animation: "loginCardEnter 0.6s ease-out",
        }}
      >
        {/* =========================
            LOGO
        ========================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "38px",
            color: "#182b3d",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          {/* Propertyse Logo */}
          <div
            style={{
              position: "relative",
              width: "29px",
              height: "30px",
              flexShrink: 0,
            }}
          >
            {/* Roof */}
            <div
              style={{
                position: "absolute",
                left: "5px",
                top: "2px",
                width: "19px",
                height: "19px",
                borderLeft: "6px solid #14a6a3",
                borderTop: "6px solid #14a6a3",
                transform: "rotate(45deg)",
              }}
            />

            {/* House */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                bottom: "2px",
                width: "19px",
                height: "19px",
                border: "5px solid #159e9b",
                background: "#ffffff",
                clipPath:
                  "polygon(0 35%, 50% 0, 100% 35%, 100% 100%, 0 100%)",
                boxSizing: "border-box",
              }}
            />
          </div>

          <span>Propertyse</span>
        </div>

        {/* =========================
            HEADING
        ========================= */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "26px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#17283a",
              fontSize: "21px",
              fontWeight: "700",
              lineHeight: "1.3",
            }}
          >
            Sign In to Your Account
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              color: "#66747f",
              fontSize: "11.5px",
              lineHeight: "1.45",
            }}
          >
            Welcome back! Enter your credentials to access
            <br />
            your properties.
          </p>
        </div>

        {/* =========================
            FORM
        ========================= */}
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div
            style={{
              marginBottom: "13px",
            }}
          >
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#344453",
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              Email Address
            </label>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: "40px",
                border: "1px solid #d1dce5",
                borderRadius: "7px",
                background: "rgba(250,252,254,0.88)",
                boxShadow:
                  "inset 0 1px 2px rgba(40,70,90,0.03)",
                boxSizing: "border-box",
              }}
            >
              <FiMail
                size={17}
                style={{
                  position: "absolute",
                  left: "10px",
                  color: "#687987",
                  pointerEvents: "none",
                }}
              />

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., alex@email.com"
                autoComplete="email"
                required
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0 12px 0 35px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#263746",
                  fontSize: "11.5px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "13px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  color: "#344453",
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                style={{
                  color: "#16a6a3",
                  fontSize: "10.5px",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                height: "40px",
                border: "1px solid #d1dce5",
                borderRadius: "7px",
                background: "rgba(250,252,254,0.88)",
                boxSizing: "border-box",
              }}
            >
              <FiLock
                size={17}
                style={{
                  position: "absolute",
                  left: "10px",
                  color: "#687987",
                  pointerEvents: "none",
                }}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0 40px 0 35px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#263746",
                  fontSize: "11.5px",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                style={{
                  position: "absolute",
                  right: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  padding: 0,
                  background: "transparent",
                  color: "#75838d",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <FiEyeOff size={17} />
                ) : (
                  <FiEye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* SIGN IN */}
          <button
            type="submit"
            style={{
              width: "100%",
              height: "40px",
              marginTop: "5px",
              border: "none",
              borderRadius: "7px",
              background:
                "linear-gradient(135deg, #17aaa5, #1aaea7)",
              color: "#ffffff",
              fontSize: "11.5px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow:
                "0 5px 12px rgba(20,166,163,0.25)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 8px 18px rgba(20,166,163,0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 5px 12px rgba(20,166,163,0.25)";
            }}
          >
            Sign In
          </button>
        </form>

        {/* =========================
            DIVIDER
        ========================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "15px 0",
          }}
        >
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "#dce3e8",
            }}
          />

          <span
            style={{
              color: "#6c7881",
              fontSize: "10px",
              whiteSpace: "nowrap",
            }}
          >
            Or continue with
          </span>

          <span
            style={{
              flex: 1,
              height: "1px",
              background: "#dce3e8",
            }}
          />
        </div>

        {/* =========================
            SOCIAL LOGIN
        ========================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              height: "33px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              border: "1px solid #d6e0e5",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.65)",
              color: "#273746",
              fontSize: "11px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            <FcGoogle size={18} />
            <span>Google</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleAppleLogin}
            style={{
              height: "33px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              border: "1px solid #d6e0e5",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.65)",
              color: "#273746",
              fontSize: "11px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            <FaApple size={18} />
            <span>Apple</span>
          </button>
        </div>

        {/* =========================
            CREATE ACCOUNT
        ========================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            marginTop: "17px",
            color: "#53616c",
            fontSize: "10px",
          }}
        >
          <span>Don't have an account?</span>

          <Link
            to="/register"
            style={{
              color: "#159f9d",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes loginCardEnter {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (max-width: 520px) {
            .login-card {
              padding: 24px 25px 30px !important;
            }
          }

          @media (max-width: 380px) {
            .login-card {
              padding: 22px 20px 27px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;