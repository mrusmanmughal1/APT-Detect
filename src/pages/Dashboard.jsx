import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "../components/SideBar";
import { NormalTrafic } from "../components/ui/NormalTrafic";
import Malicious from "../components/ui/Malicious";
import TrafficeDetails from "../components/ui/TrafficeDetails";
import { useSocket } from "../Context/Socket";
import { useGetAPTCHeckList } from "../Hooks/useGetAPTCHeckList";

const Dashboard = () => {
  const socket = useSocket();
  const [maliciousTraffic, setMaliciousTraffic] = useState([]);
  const [aptChecklistData, setAPTChecklistData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

  // Custom hook for API data
  const { data } = useGetAPTCHeckList();

  // Helper function to transform APT Checklist data
  const transformAPTData = (checklist) => {
    if (!checklist) return [];
    const aggregatedData = {};

    // Loop through each IP and its categories
    Object.values(checklist).forEach((categories) => {
      Object.entries(categories).forEach(([category, count]) => {
        // Remove HTML tags to extract the category name
        const cleanCategory = category.replace(/<\/?[^>]+(>|$)/g, "");
        if (aggregatedData[cleanCategory]) {
          aggregatedData[cleanCategory] += count;
        } else {
          aggregatedData[cleanCategory] = count;
        }
      });
    });

    // Convert to array format suitable for PieChart
    return Object.entries(aggregatedData).map(([name, value]) => ({
      name,
      value,
    }));
  };

  // Process API Data
  useEffect(() => {
    if (data?.data?.APT_Checklist) {
      const transformedData = transformAPTData(data.data.APT_Checklist);
      setAPTChecklistData(transformedData);
      setLoading(false);
    }
  }, [data]);

  // Process WebSocket Data
  useEffect(() => {
    if (!socket) return; // Ensure socket is available

    socket.on("newresult", (data) => {
      console.log("Malicious Data Received: Dashboard", data);
      if (data?.APT_Checklist) {
        const transformedData = transformAPTData(data.APT_Checklist);
        setAPTChecklistData(transformedData);
      }
    });

    socket.on("connect", () => console.log("✅ Connected to WebSocket server."));
    socket.on("disconnect", () =>
      console.warn("⚠️ Disconnected from WebSocket server.")
    );

    return () => {
      socket.off("newresult");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

// Transformed data for the PieChart

 

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-20 pr-6 py-6 transition-all duration-300 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-navy-800">
          Traffic Monitoring
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Normal Traffic */}
          <NormalTrafic />

          {/* MITRE Mapping */}
          <div className="rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">MITRE Mapping</h3>
              <div className="h-64 min-h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aptChecklistData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {aptChecklistData.map((entry, index) => (
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

          {/* Malicious Traffic */}
          <Malicious />

          {/* Traffic Details */}
          <TrafficeDetails />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
