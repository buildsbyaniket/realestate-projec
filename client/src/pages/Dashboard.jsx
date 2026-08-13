// src/pages/Dashboard.jsx

import React from "react";
import {
  FiHome,
  FiList,
  FiTag,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

function Dashboard() {
  const dashboardStats = [
    {
      title: "Total Properties",
      value: "1,352",
      change: "+3.2%",
      text: "vs last month",
      icon: FiHome,
      active: true,
    },
    {
      title: "Active Listings",
      value: "894",
      change: "+1.8%",
      text: "vs last month",
      icon: FiList,
    },
    {
      title: "Sold This Month",
      value: "47",
      change: "+12%",
      text: "growth",
      icon: FiTag,
    },
    {
      title: "Revenue (Dec 2023)",
      value: "$1,850,230",
      change: "+8.5%",
      text: "growth",
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px]">
      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#293840] sm:text-3xl">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-[#748087]">
          Welcome Alex Carter to your management app.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                stat.active
                  ? "border-[#75c5c1]"
                  : "border-[#e2e8eb]"
              }`}
              style={{
                animation: `fadeInUp 0.5s ease-out ${
                  index * 100
                }ms both`,
              }}
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-[#59666e]">
                  {stat.title}
                </p>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f5] text-[#55aaa7] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </div>
              </div>

              {/* Value */}
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#2d3b43]">
                {stat.value}
              </h2>

              {/* Bottom */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-[#718087]">
                  <span className="font-bold text-[#4e9f9d]">
                    {stat.change}
                  </span>

                  <span className="ml-1">{stat.text}</span>
                </p>

                <FiTrendingUp
                  size={18}
                  className="text-[#55aaa7]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Dashboard Area */}
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Property Overview */}
        <div className="xl:col-span-2 rounded-2xl border border-[#e0e6e8] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#293840]">
                Property Overview
              </h2>

              <p className="mt-1 text-sm text-[#748087]">
                Property and revenue analytics
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f5]">
              <FiTrendingUp
                size={21}
                className="text-[#55aaa7]"
              />
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-7 flex h-[300px] items-center justify-center rounded-xl border border-dashed border-[#d8e1e3] bg-[#f8fbfb]">
            <div className="text-center">
              <FiTrendingUp
                size={38}
                className="mx-auto text-[#8bc9c6]"
              />

              <p className="mt-3 text-sm font-medium text-[#7a878d]">
                Property analytics chart
              </p>

              <p className="mt-1 text-xs text-[#a0aaae]">
                Chart data will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-2xl border border-[#e0e6e8] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#293840]">
            Quick Summary
          </h2>

          <p className="mt-1 text-sm text-[#748087]">
            Current portfolio status
          </p>

          <div className="mt-7 space-y-5">
            <div className="rounded-xl bg-[#f7faf9] p-4">
              <p className="text-xs text-[#77838a]">
                Total Properties
              </p>

              <p className="mt-2 text-2xl font-bold text-[#2d3b43]">
                1,352
              </p>
            </div>

            <div className="rounded-xl bg-[#f7faf9] p-4">
              <p className="text-xs text-[#77838a]">
                Active Listings
              </p>

              <p className="mt-2 text-2xl font-bold text-[#2d3b43]">
                894
              </p>
            </div>

            <div className="rounded-xl bg-[#f7faf9] p-4">
              <p className="text-xs text-[#77838a]">
                Monthly Revenue
              </p>

              <p className="mt-2 text-2xl font-bold text-[#2d3b43]">
                $1.85M
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;