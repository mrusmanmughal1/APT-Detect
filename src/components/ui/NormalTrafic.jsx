import { useEffect, useState } from "react";
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

export const NormalTrafic = () => {
  const socket = useSocket();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!socket) return;


    socket.on("connect", () => console.log("✅ Connected to WebSocket server."));
    socket.on("disconnect", () => console.log("⚠️ Disconnected from WebSocket."));
    socket.on("newresult", (data) => {

      const normalData = data.ips.map((ipData) => ({
        ip: ipData.SourceIP,
        value: ipData.count,
      }));
      setChartData(normalData);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("newresult");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Normal Traffic Flow</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
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
  );
};
