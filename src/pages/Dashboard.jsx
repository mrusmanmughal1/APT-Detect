import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "../components/SideBar";

const TrafficMonitoringDashboard = () => {
  // Sample data for normal traffic flow
  const normalTrafficData = [
    { ip: "192.168.1.1", value: 600 },
    { ip: "192.168.1.2", value: 400 },
    { ip: "192.168.1.3", value: 450 },
    { ip: "192.168.1.4", value: 300 },
    { ip: "192.168.1.5", value: 200 },
  ];

  // Sample data for malicious traffic flow
  const maliciousTrafficData = [
    { ip: "192.168.1.1", value: 550 },
    { ip: "192.168.1.2", value: 400 },
    { ip: "192.168.1.3", value: 450 },
    { ip: "192.168.1.4", value: 800 },
    { ip: "192.168.1.5", value: 600 },
  ];

  // Sample data for MITRE mapping
  const mitreData = [
    { name: "Category 1", value: 25 },
    { name: "Category 2", value: 25 },
    { name: "Category 3", value: 25 },
    { name: "Category 4", value: 25 },
  ];

  const COLORS = ["#E8E8E8", "#D3D3D3", "#C0C0C0", "#A9A9A9"];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main content with margin to account for sidebar */}
      <div className="flex-1 pl-20 pr-6 py-6 transition-all duration-300 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-navy-800">
          Traffic Monitoring
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Normal Traffic Flow */}
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Normal Traffic Flow
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={normalTrafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ip" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* MITRE Mapping */}
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">MITRE Mapping</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mitreData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mitreData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Malicious Traffic Flow */}
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Malicious Traffic Flow
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maliciousTrafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ip" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#ff6b6b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Traffic Details Table */}
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Traffic Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        Flow ID
                      </th>
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        IP Address
                      </th>
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        Attack Type
                      </th>
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        Severity
                      </th>
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        Remediation Action
                      </th>
                      <th className="p-2 border border-gray-200 text-left font-semibold">
                        Time Stamp
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-gray-200">-</td>
                      <td className="p-2 border border-gray-200">-</td>
                      <td className="p-2 border border-gray-200">-</td>
                      <td className="p-2 border border-gray-200">-</td>
                      <td className="p-2 border border-gray-200">-</td>
                      <td className="p-2 border border-gray-200">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMonitoringDashboard;
