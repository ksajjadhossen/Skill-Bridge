"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsProps {
  eventsCategoryData: { name: string; count: number }[];
  capacityData: { name: string; registered: number; capacity: number }[];
}

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function OrganizerAnalytics({
  eventsCategoryData,
  capacityData,
}: AnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      {/* Category Distribution Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          Events by Category
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={eventsCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {eventsCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Capacity Utilization Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          Volunteer Registration Capacity
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capacityData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Bar
                dataKey="registered"
                fill="#2563EB"
                name="Registered"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="capacity"
                fill="#E5E7EB"
                name="Total Capacity"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
