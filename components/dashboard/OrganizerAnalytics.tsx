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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

interface AnalyticsProps {
  eventsCategoryData: { name: string; count: number }[];
  capacityData: { name: string; registered: number; capacity: number }[];
  growthData?: { date: string; registrations: number; events: number }[];
}

const COLORS = ["#0d9488", "#38bdf8", "#f59e0b", "#f43f5e", "#8b5cf6"];

export default function OrganizerAnalytics({
  eventsCategoryData,
  capacityData,
  growthData = [
    { date: "Jan", registrations: 4, events: 1 },
    { date: "Feb", registrations: 8, events: 2 },
    { date: "Mar", registrations: 12, events: 3 },
    { date: "Apr", registrations: 18, events: 3 },
    { date: "May", registrations: 25, events: 4 },
  ],
}: AnalyticsProps) {
  return (
    <div className="space-y-6 my-6 w-full">
      {/* Top Row: Two Charts (Pie & Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Events by Category */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
            Events by Category
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Distribution of community events across different categories.
          </p>
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volunteer Registration Capacity */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
            Volunteer Registration Capacity
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Compare total capacity vs current registrations per event.
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="registered"
                  fill="#0d9488"
                  name="Registered"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="capacity"
                  fill="#334155"
                  name="Total Capacity"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Full Width Line Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs w-full">
        <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
          Platform Growth & Registration Trends
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Overview of community engagement and volunteer sign-ups over time.
        </p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.2}
              />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#f8fafc",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#0d9488"
                strokeWidth={3}
                dot={{ r: 4, fill: "#0d9488" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4, fill: "#38bdf8" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
