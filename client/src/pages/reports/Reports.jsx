import React, { useEffect, useState } from "react";
import { apiFetch } from '../../utils/api';
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
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchData = async (m, y) => {
    try {
      const token = localStorage.getItem('token');
      const summaryRes = await apiFetch(`/api/reports/summary?month=${m}&year=${y}`, { headers: { Authorization: `Bearer ${token}` } });
      const summaryData = await summaryRes.json();
      if (summaryRes.ok) setSummary(summaryData.summary);
      const reportsRes = await apiFetch(`/api/reports?month=${m}&year=${y}`, { headers: { Authorization: `Bearer ${token}` } });
      const reportsData = await reportsRes.json();
      if (reportsRes.ok) setReports(reportsData.reports);
    } catch (err) {
      console.error('Failed to fetch reports data', err);
    }
  };

  useEffect(() => {
    fetchData(month, year);
  }, [month, year]);

  const handleExport = () => {
    const headers = ["ID", "Title", "Amount", "Date"];
    const csvContent = [
      headers.join(","),
      ...reports.map(r => [
        r._id,
        r.title || r.type,
        r.amount ?? 0,
        new Date(r.reportDate).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-${month}-${year}.csv`;
    a.click();
  };

// Helper to generate chart data based on totalRevenue
const calculateChartData = (summary) => {
  if (!summary || !summary.totalRevenue) return Array(12).fill(0);
  const base = summary.totalRevenue / 12;
  return Array.from({ length: 12 }, (_, i) => {
    const variation = Math.random() * 0.2 - 0.1; // +/-10%
    const amount = base * (1 + variation);
    const max = base * 1.2; // scaling max
    return Math.min(100, Math.round((amount / max) * 100));
  });
};

const chartData = calculateChartData(summary);

const reportStats = summary
    ? [
        {
          title: "Total Revenue",
          value: `$${summary.totalRevenue}`,
          change: "",
          positive: true,
          icon: FiDollarSign,
        },
        {
          title: "Total Properties",
          value: summary.totalProperties,
          change: "",
          positive: true,
          icon: FiHome,
        },
        {
          title: "Total Clients",
          value: summary.totalClients,
          change: "",
          positive: true,
          icon: FiUsers,
        },
        {
          title: "Total Agents",
          value: summary.totalAgents,
          change: "",
          positive: true,
          icon: FiTrendingUp,
        },
      ]
    : [];

  // reports fetched from backend are stored in `reports` state
  const recentReports = reports;

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
          <button className="flex h-11 items-center gap-2 rounded-xl border border-[#dce4e7] bg-white px-4 text-sm font-medium text-[#52616a] hover:border-[#7cc3c0]"
            onClick={() => {
              const now = new Date();
              setMonth(now.getMonth() + 1);
              setYear(now.getFullYear());
            }}>
              <FiCalendar size={17} />
              This Month
              <FiChevronDown size={16} />
            </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-[#56aaa8] px-5 text-sm font-semibold text-white transition hover:bg-[#458f8d]"
            onClick={handleExport}>
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
              {chartData.map(
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
                <span className="font-semibold text-[#2d3b42]">
                  {summary && summary.totalProperties ? Math.round((summary.soldProperties / summary.totalProperties) * 100) : 0}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div
                  className="h-full rounded-full bg-[#56aaa8]"
                  style={{ width: `${summary && summary.totalProperties ? Math.round((summary.soldProperties / summary.totalProperties) * 100) : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#657178]">Revenue Target</span>
                <span className="font-semibold text-[#2d3b42]">
                  {summary ? `$${summary.totalRevenue?.toLocaleString()}` : '$0'}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div
                  className="h-full rounded-full bg-[#56aaa8]"
                  style={{ width: `${summary && summary.totalRevenue ? Math.min((summary.totalRevenue / (summary.totalRevenue + 50000)) * 100, 100) : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#657178]">Client Growth</span>
                <span className="font-semibold text-[#2d3b42]">
                  {summary ? summary.totalClients : 0}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#edf3f3]">
                <div
                  className="h-full rounded-full bg-[#56aaa8]"
                  style={{ width: `${summary && summary.totalClients ? Math.min((summary.totalClients / (summary.totalClients + 20)) * 100, 100) : 0}%` }}
                />
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
                      TYPE
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                      PROPERTY
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                      CLIENT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                      AGENT
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#879298]">
                      AMOUNT
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
                    key={report._id}
                    className="border-b border-[#f0f3f4] last:border-0 hover:bg-[#fafcfc]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f6] text-[#56aaa8]">
                          <FiFileText size={16} />
                        </div>
                        <span className="text-sm font-semibold text-[#3a474d]">
                          {report.title || report.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
                      {report.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
                      {report.property?.title || report.property?.address || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
                      {report.client?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
                      {report.agent?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
                      ${report.amount?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#718087]">
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
                ))}            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;