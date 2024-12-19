import React, { useEffect, useState } from "react";
import { useSocket } from "../../Context/Socket";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Malicious = () => {
  const socket = useSocket();
  const [maliciousTraffic, setMaliciousTraffic] = useState([]);

  useEffect(() => {
    if (!socket) return; // Ensure socket is available

    console.log("Initializing socket listeners for Malicious traffic...");

    // Listen for the 'newresult' event
    socket.on("newresult", (data) => {
      console.log("Malicious Data Received:", data);

      // Map data to chart format safely
      const maliciousData = data?.ips?.map((ipData) => ({
        ip: ipData.SourceIP,
        value: ipData.count,
      })) || [];
      setMaliciousTraffic(maliciousData);
    });

    // Connection and disconnection events
    socket.on("connect", () => console.log("✅ Connected to WebSocket server."));
    socket.on("disconnect", () =>
      console.warn("⚠️ Disconnected from WebSocket server.")
    );

    // Cleanup listeners
    return () => {
      console.log("Cleaning up socket listeners for Malicious traffic...");
      socket.off("newresult");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Malicious Traffic Flow</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={maliciousTraffic}>
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
  );
};

export default Malicious;
