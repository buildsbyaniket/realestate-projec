import React from "react";
import {
  FiBarChart2,
  FiTrendingUp,
  FiHome,
  FiDollarSign,
  FiUsers,
  FiDownload,
  FiCalendar,
  FiChevronDown,
  FiFileText,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

const Reports = () => {
  const reportStats = [
    {
      title: "Total Revenue",
      value: "$1,850,230",
      change: "+12.5%",
      positive: true,
      icon: FiDollarSign,
    },
    {
      title: "Properties Sold",
      value: "247",
      change: "+8.2%",
      positive: true,
      icon: FiHome,
    },
    {
      title: "Active Clients",
      value: "1,284",
      change: "+5.4%",
      positive: true,
      icon: FiUsers,
    },
    {
      title: "Average Growth",
      value: "18.6%",
      change: "-2.1%",
      positive: false,
      icon: FiTrendingUp,
    },
  ];

  const recentReports = [
    {
      name: "Monthly Revenue Report",
      category: "Financial Report",
      date: "December 30, 2023",
      status: "Ready",
    },
    {
      name: "Property Performance Report",
      category: "Properties",
      date: "December 28, 2023",
      status: "Ready",
    },
    {
      name: "Agent Performance Report",
      category: "Agents",
      date: "December 25, 2023",
      status: "Ready",
    },
    {
      name: "Client Activity Report",
      category: "Clients",
      date: "December 20, 2023",
      status: "Ready",
    },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7f6] text-[#56aaa8]">
            <FiBarChart2 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#26343b]">
              Reports & Analytics
            </h1>

            <p className="mt-1 text-sm text-[#748087]">
              Monitor your business performance and analytics.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-[#dce4e7] bg-white px-4 text-sm font-medium text-[#52616a] hover:border-[#7cc3c0]">
            <FiCalendar size={17} />
            This Month
            <FiChevronDown size={16} />
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-[#56aaa8] px-5 text-sm font-semibold text-white transition hover:bg-[#458f8d]">
            <FiDownload size={17} />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#e0e7e9] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7f6] text-[#56aaa8]">
                  <Icon size={20} />
                </div>

                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.positive
                      ? "text-[#4e9f9d]"
                      : "text-[#dc6b6b]"
                  }`}
                >
                  {stat.positive ? (
                    <FiArrowUpRight size={14} />
                  ) : (
                    <FiArrowDownRight size={14} />
                  )}

                  {stat.change}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-[#738087]">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#293840]">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-[#9aa5aa]">
                  Compared with last month
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue Chart */}
        <div className="rounded-2xl border border-[#e0e7e9] bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#2d3b42]">
                Revenue Overview
              </h2>

              <p className="mt-1 text-xs text-[#849096]">
                Monthly revenue performance
              </p>
            </div>

            <FiTrendingUp className="text-[#56aaa8]" size={22} />
          </div>

          <div className="mt-8">
            <div className="flex h-[250px] items-end gap-3 border-b border-[#edf1f2] pb-2">
              {[35, 52, 45, 68, 58, 78, 72, 90, 84, 65, 95, 88].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-[#9bd4d2] transition-all duration-300 hover:bg-[#56aaa8]"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-[#9aa5aa]">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="rounded-2xl border border-[#e0e7e9] bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#2d3b42]">
              Performance
            </h2>

            <p className="mt-1 text-xs text-[#849096]">
              Business summary
            </p>
          </div>

          <div className="mt-7 space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#657178]">Properties Sold</span>
                <span className="font-semibold text-[#2d3b42]">82%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div className="h-full w-[82%] rounded-full bg-[#56aaa8]" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#657178]">Revenue Target</span>
                <span className="font-semibold text-[#2d3b42]">74%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div className="h-full w-[74%] rounded-full bg-[#56aaa8]" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#657178]">Client Growth</span>
                <span className="font-semibold text-[#2d3b42]">91%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div className="h-full w-[91%] rounded-full bg-[#56aaa8]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-7 overflow-hidden rounded-2xl border border-[#e0e7e9] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf1f2] p-6">
          <div>
            <h2 className="text-lg font-bold text-[#2d3b42]">
              Recent Reports
            </h2>

            <p className="mt-1 text-xs text-[#849096]">
              Recently generated reports
            </p>
          </div>

          <button className="text-sm font-semibold text-[#56aaa8]">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#edf1f2] bg-[#fafcfc]">
                <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                  REPORT
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                  CATEGORY
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                  DATE
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                  STATUS
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold text-[#879298]">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {recentReports.map((report) => (
                <tr
                  key={report.name}
                  className="border-b border-[#f0f3f4] last:border-0 hover:bg-[#fafcfc]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f6] text-[#56aaa8]">
                        <FiFileText size={16} />
                      </div>

                      <span className="text-sm font-semibold text-[#3a474d]">
                        {report.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#718087]">
                    {report.category}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#718087]">
                    {report.date}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#e8f7f6] px-3 py-1 text-xs font-semibold text-[#4e9f9d]">
                      {report.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-[#7b878d] hover:bg-[#e8f7f6] hover:text-[#56aaa8]">
                      <FiDownload size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;