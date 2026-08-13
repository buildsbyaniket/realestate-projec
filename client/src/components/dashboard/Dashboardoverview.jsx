// src/pages/Dashboard.jsx

import React from "react";
import {
  FiHome,
  FiList,
  FiTag,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

const Dashboard = () => {
  const dashboardStats = [
    {
      title: "Total Properties",
      value: "1,352",
      change: "+3.2%",
      text: "vs last month",
      icon: FiHome,
      iconBg: "bg-[#e8f7f6]",
      iconColor: "text-[#56aaa8]",
      active: true,
    },
    {
      title: "Active Listings",
      value: "894",
      change: "+1.8%",
      text: "vs last month",
      icon: FiList,
      iconBg: "bg-[#e8f7f6]",
      iconColor: "text-[#56aaa8]",
    },
    {
      title: "Sold This Month",
      value: "47",
      change: "+12%",
      text: "growth",
      icon: FiTag,
      iconBg: "bg-[#e8f7f6]",
      iconColor: "text-[#56aaa8]",
    },
    {
      title: "Revenue (Dec 2023)",
      value: "$1,850,230",
      change: "+8.5%",
      text: "growth",
      icon: FiDollarSign,
      iconBg: "bg-[#e8f7f6]",
      iconColor: "text-[#56aaa8]",
    },
  ];

  return (
    <div className="min-h-full w-full">
      {/* Page Heading */}
      <div className="mb-5">
        <h1 className="text-[28px] font-semibold tracking-tight text-[#27333b]">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-[13px] text-[#6f7a80]">
          Welcome Alex Carter to your management app.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid max-w-[850px] grid-cols-1 gap-3 sm:grid-cols-2">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`
                group relative min-h-[104px]
                rounded-xl border bg-white
                px-5 py-4
                shadow-[0_3px_10px_rgba(15,23,42,0.10)]
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-[0_8px_20px_rgba(15,23,42,0.14)]
                ${
                  stat.active
                    ? "border-[#7cc3c0]"
                    : "border-[#dce4e7]"
                }
              `}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`,
              }}
            >
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-[#56636a]">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-[23px] font-bold tracking-wide text-[#2b373f]">
                    {stat.value}
                  </h2>
                </div>

                {/* Icon */}
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center
                    rounded-lg
                    ${stat.iconBg}
                    ${stat.iconColor}
                    transition-transform duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon size={16} strokeWidth={2} />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-[10px] font-semibold text-[#4e9f9d]">
                    {stat.change}
                  </span>

                  <span className="ml-1 text-[10px] text-[#6e777d]">
                    {stat.text}
                  </span>
                </div>

                {/* Small Trending Icon */}
                <div className="flex h-5 w-7 items-center justify-center rounded bg-[#eaf6f5] text-[#56aaa8]">
                  <FiTrendingUp size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty Overview Area - matches your reference UI */}
      <div className="mt-5 max-w-[850px] rounded-xl border border-[#d9e1e4] bg-white/40 p-2 shadow-sm">
        <div className="flex h-[220px] items-center justify-center rounded-lg border border-[#dce4e7] bg-white/60">
          <div className="text-center">
            <div className="mb-2 text-[20px] font-semibold text-[#52616a]">
              Overview Chart Placeholder
            </div>

            <p className="text-xs text-gray-400">
              Property and revenue analytics will appear here.
            </p>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
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

export default Dashboard;