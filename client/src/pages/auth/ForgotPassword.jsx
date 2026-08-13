import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    // Frontend demo only.
    // Connect your forgot-password API here later.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dff3ff] via-[#f7fbfd] to-[#e5f7f5] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

        {/* Main Card */}
        <div className="w-full max-w-[450px] overflow-hidden rounded-[18px] border border-white/70 bg-white/80 shadow-[0_15px_45px_rgba(31,51,64,0.16)] backdrop-blur-xl">

          {/* Content */}
          <div className="px-8 py-9 sm:px-10">

            {/* Logo */}
            <div className="mb-10 flex items-center">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute h-7 w-7 rotate-45 rounded-[6px] bg-[#17aaa5]" />

                <div className="relative flex h-5 w-5 items-center justify-center">
                  <div className="h-4 w-4 border-[4px] border-white" />
                </div>
              </div>

              <span className="ml-2 text-[21px] font-bold tracking-tight text-[#1d2b3a]">
                Properties
              </span>
            </div>

            {!submitted ? (
              <>
                {/* Heading */}
                <div className="mb-7 text-center">
                  <h1 className="text-[25px] font-bold tracking-tight text-[#172536]">
                    Forgot Password?
                  </h1>

                  <p className="mx-auto mt-2 max-w-[320px] text-[13px] leading-5 text-[#65727d]">
                    No worries. Enter your email address and we'll send you a
                    link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[12px] font-medium text-[#26343f]"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <FiMail
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77838d]"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., alex@email.com"
                        required
                        autoComplete="email"
                        className="h-[47px] w-full rounded-[8px] border border-[#cfd9df] bg-white/70 pl-10 pr-4 text-[13px] text-[#26343f] outline-none transition-all duration-200 placeholder:text-[#9ba6ae] focus:border-[#17aaa5] focus:bg-white focus:ring-2 focus:ring-[#17aaa5]/15"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="h-[47px] w-full rounded-[8px] bg-[#18aaa5] text-[13px] font-semibold text-white shadow-[0_5px_12px_rgba(24,170,165,0.25)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#129893] hover:shadow-[0_7px_16px_rgba(24,170,165,0.30)] active:translate-y-0"
                  >
                    Send Reset Link
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-7 flex justify-center">
                  <Link
                    to="/login"
                    className="group flex items-center gap-2 text-[12px] font-medium text-[#52616d] transition-colors hover:text-[#159b97]"
                  >
                    <FiArrowLeft
                      size={15}
                      className="transition-transform duration-200 group-hover:-translate-x-1"
                    />

                    Back to Sign In
                  </Link>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center">

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f7f5]">
                  <FiCheckCircle
                    size={31}
                    className="text-[#17aaa5]"
                  />
                </div>

                <h1 className="text-[24px] font-bold tracking-tight text-[#172536]">
                  Check Your Email
                </h1>

                <p className="mx-auto mt-3 max-w-[320px] text-[13px] leading-5 text-[#65727d]">
                  We've sent password reset instructions to:
                </p>

                <p className="mt-2 break-all text-[13px] font-semibold text-[#17aaa5]">
                  {email}
                </p>

                <p className="mx-auto mt-4 max-w-[320px] text-[12px] leading-5 text-[#7a858d]">
                  If you don't see the email, please check your spam or junk
                  folder.
                </p>

                {/* Back */}
                <Link
                  to="/login"
                  className="mt-7 inline-flex h-[45px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#18aaa5] text-[13px] font-semibold text-white shadow-[0_5px_12px_rgba(24,170,165,0.25)] transition-all duration-200 hover:bg-[#129893]"
                >
                  <FiArrowLeft size={16} />
                  Back to Sign In
                </Link>

                {/* Try another email */}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="mt-5 text-[12px] font-medium text-[#65727d] transition-colors hover:text-[#17aaa5]"
                >
                  Use a different email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;