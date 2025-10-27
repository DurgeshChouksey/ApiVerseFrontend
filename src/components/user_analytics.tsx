import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetUserAnalyticsQuery } from "@/features/analytics/analyticsApi";

const ranges = [
  { label: "1h", value: 0.04 }, // 1 hour ≈ 0.04 days
  { label: "3h", value: 0.125 },
  { label: "12h", value: 0.5 },
  { label: "24h", value: 1 },
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
];

const UserAnalytics = () => {
  const { apiId } = useParams();
  const [selectedDays, setSelectedDays] = useState(7);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetUserAnalyticsQuery(
    { apiId: apiId!, days: selectedDays },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (apiId) refetch();
  }, [apiId, selectedDays]);

  if (isLoading) return <div className="text-center text-gray-500">Loading user analytics...</div>;
  if (error) return <div className="text-red-500 text-center">Failed to load user analytics</div>;
  if (!data) return null;

  return (
    <div className="p-3 md:p-6 space-y-8 bg-gray-50 dark:bg-[#09090B]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          User Analytics
        </h2>

        {/* Time Range Selector */}
        <div className="flex bg-white dark:bg-[#121212] rounded-lg shadow overflow-hidden border border-gray-300 dark:border-gray-700">
          {ranges.map((r) => (
            <button
              key={r.label}
              onClick={() => setSelectedDays(r.value)}
              className={`px-3 py-1 text-sm font-medium ${
                selectedDays === r.value
                  ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#121212] rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm uppercase">Active Users</p>
          <h3 className="text-3xl font-bold text-blue-500">{data.activeUsers}</h3>
        </div>

        <div className="bg-white dark:bg-[#121212] rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm uppercase">Total Users</p>
          <h3 className="text-3xl font-bold text-green-500">{data.totalUsers}</h3>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-[#121212] rounded-lg shadow p-2 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Daily Active Users
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                color: "#fff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
