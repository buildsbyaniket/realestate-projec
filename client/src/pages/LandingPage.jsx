import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Home,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  stats,
  featuredProperties,
  soldProperties,
  contactInfo,
} from "../data/demoData";

/* =========================================================
   IMAGE FALLBACK
========================================================= */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85";

const SafeImage = ({
  src,
  alt = "",
  className = "",
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(FALLBACK_IMAGE)}
      {...props}
    />
  );
};

/* =========================================================
   PROPERTY CARD
========================================================= */

const PropertyCard = ({ property }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[270px] overflow-hidden">
        <SafeImage
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {property.tag && (
          <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg">
            {property.tag}
          </div>
        )}

        <div className="absolute bottom-5 left-5 text-white">
          <p className="mb-1 flex items-center gap-1 text-sm text-white/80">
            <MapPin size={14} />
            {property.location}
          </p>

          <h3 className="text-xl font-bold">
            {property.title}
          </h3>
        </div>

        <button
          type="button"
          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-500">
            {property.price}
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            Available
          </span>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-800">
              {property.beds}
            </p>
            <p>Beds</p>
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {property.baths}
            </p>
            <p>Baths</p>
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {property.sqft}
            </p>
            <p>sq ft</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN LANDING PAGE
========================================================= */

const LandingPage = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=90",
  ];

  /* Hero image slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* Header scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* SEO */
  useEffect(() => {
    document.title = "PropManage | Premium Property Management";

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content =
      "PropManage makes property management simple. Discover, manage, buy and sell premium properties with confidence.";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2 text-xl font-bold ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
              <Home size={21} />
            </span>

            <span>
              Prop<span className="text-emerald-500">Manage</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className={`text-sm font-medium transition ${
                scrolled
                  ? "text-slate-600 hover:text-emerald-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Home
            </a>

            <a
              href="#properties"
              className={`text-sm font-medium transition ${
                scrolled
                  ? "text-slate-600 hover:text-emerald-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Properties
            </a>

            <a
              href="#about"
              className={`text-sm font-medium transition ${
                scrolled
                  ? "text-slate-600 hover:text-emerald-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              About
            </a>

            <a
              href="#contact"
              className={`text-sm font-medium transition ${
                scrolled
                  ? "text-slate-600 hover:text-emerald-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Header buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition sm:block ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >

        {/* Background images */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              heroIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <SafeImage
              src={image}
              alt="Luxury property"
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 text-center text-white">

          {/* Badge */}
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-md">
            <Sparkles size={16} className="text-emerald-400" />
            Premium Property Management
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Welcome to
            <br />
            <span className="text-white">
              PropManage
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl md:text-2xl">
            Manage, buy, and sell properties with ease.
            <br className="hidden sm:block" />
            Your trusted partner in real estate from listings
            to closing.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/register"
              className="group flex items-center gap-3 rounded-full bg-emerald-500 px-9 py-4 text-lg font-bold text-white shadow-2xl shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
            >
              Get Started

              <ArrowRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-3 rounded-full border border-white/50 bg-white/10 px-9 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
            >
              Login
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Slider dots */}
          <div className="mt-12 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setHeroIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  heroIndex === index
                    ? "w-8 bg-emerald-400"
                    : "w-2 bg-white/50"
                }`}
                aria-label={`Hero image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#stats"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80"
        >
          <ChevronDown
            size={30}
            className="animate-bounce"
          />
        </a>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        id="stats"
        className="border-b border-slate-100 bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROPERTIES
      ===================================================== */}

      <section
        id="properties"
        className="bg-slate-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
                <span className="h-px w-8 bg-emerald-500" />
                Featured Properties
              </div>

              <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Find a place you'll
                <br />
                <span className="text-emerald-500">
                  love to call home.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-slate-500">
              Explore carefully selected properties managed
              through the PropManage platform.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT / WHY PROPMANAGE
      ===================================================== */}

      <section
        id="about"
        className="bg-white py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">

          <div className="relative">

            <div className="overflow-hidden rounded-[2rem]">
              <SafeImage
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury property"
                className="h-[520px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-8 -right-5 rounded-3xl bg-emerald-500 p-7 text-white shadow-2xl sm:right-5">
              <Building2 size={30} />
              <p className="mt-3 text-3xl font-black">
                3,400+
              </p>
              <p className="text-sm text-white/80">
                Properties Sold
              </p>
            </div>
          </div>

          <div>

            <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
              <span className="h-px w-8 bg-emerald-500" />
              Why PropManage
            </div>

            <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Real estate
              <br />
              management,
              <br />
              <span className="text-emerald-500">
                made simple.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-500">
              PropManage brings properties, clients, agents,
              enquiries and transactions together in one
              powerful platform.
            </p>

            <div className="mt-8 space-y-5">

              {[
                "Premium property listings",
                "Professional agent management",
                "Easy client and enquiry management",
                "Secure and organized property data",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="shrink-0 text-emerald-500"
                  />

                  <span className="font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          SOLD PROPERTIES
      ===================================================== */}

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
              <span className="h-px w-8 bg-emerald-500" />
              Our Track Record
              <span className="h-px w-8 bg-emerald-500" />
            </div>

            <h2 className="text-4xl font-black text-slate-900 md:text-5xl">
              Recently Sold
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              A look at some of the properties successfully
              managed and sold through PropManage.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">

            {soldProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        id="contact"
        className="bg-white py-20"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-20 text-center text-white shadow-2xl sm:px-12">

            {/* Decorative circles */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-white/5" />

            <div className="relative z-10">

              <h2 className="text-4xl font-black md:text-5xl">
                Ready to find your dream property?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90">
                Reach out today and let our team guide you
                through every step of the process.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-emerald-600 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Mail size={20} />
                  {contactInfo.email}
                </a>

                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/20"
                >
                  <Phone size={20} />
                  {contactInfo.phone}
                </a>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#050b1d] text-slate-300">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500">
                  <Home size={19} />
                </span>

                Prop<span className="text-emerald-400">
                  Manage
                </span>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
                Property management made simple. List,
                manage, and sell with confidence.
              </p>

            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-bold text-white">
                Quick Links
              </h3>

              <div className="mt-5 space-y-4 text-sm">
                <a
                  href="#home"
                  className="block transition hover:text-emerald-400"
                >
                  Home
                </a>

                <Link
                  to="/register"
                  className="block transition hover:text-emerald-400"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="block transition hover:text-emerald-400"
                >
                  Login
                </Link>

                <a
                  href="#properties"
                  className="block transition hover:text-emerald-400"
                >
                  Properties
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white">
                Contact
              </h3>

              <div className="mt-5 space-y-4 text-sm">

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 transition hover:text-emerald-400"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <span>
                    {contactInfo.email}
                  </span>
                </a>

                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition hover:text-emerald-400"
                >
                  <Phone
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  {contactInfo.phone}
                </a>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <span>
                    {contactInfo.address}
                  </span>
                </div>

              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-white">
                Newsletter
              </h3>

              <p className="mt-5 text-sm leading-6 text-slate-400">
                Get the latest listings and market insights.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing!");
                }}
                className="mt-5 flex"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-l-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="flex w-14 items-center justify-center rounded-r-xl bg-emerald-500 text-white transition hover:bg-emerald-600"
                >
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-14 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} PropManage. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;