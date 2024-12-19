import { useEffect, useState } from "react";
import { io } from "socket.io-client";
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

// Socket.IO Setup
const socket = io("http://127.0.0.1:5000/test", {
  transports: ["websocket", "polling"],
  reconnection: true,
});

export const Dash = () => {
  const [normalTraffic, setNormalTraffic] = useState([]);
  const [maliciousIPs, setMaliciousIPs] = useState([]);
  const [normalIPs, setNormalIPs] = useState([]);
  const [flowStats, setFlowStats] = useState({});
  const [aptChecklist, setAptChecklist] = useState({});
  const [activeFlows, setActiveFlows] = useState([]);

  // Fetch REST API Data
  const fetchAPI = async (url, setter) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    // WebSocket Listener for 'newresult' (Normal Traffic)
    socket.on("newresult", (result) => {
      console.log("New result:", result);
      const processedData = result.ips.map((ipData) => ({
        ip: ipData.SourceIP,
        value: ipData.count,
      }));
      setNormalTraffic(processedData);
    });

    // Fetch API Data
    fetchAPI("http://127.0.0.1:5000/api/malicious-ips", (data) =>
      setMaliciousIPs(data.MaliciousIPs)
    );
    fetchAPI("http://127.0.0.1:5000/api/normal-ips", (data) =>
      setNormalIPs(data.NormalIPs)
    );
    fetchAPI("http://127.0.0.1:5000/api/stats", setFlowStats);
    fetchAPI("http://127.0.0.1:5000/api/apt-checklist", (data) =>
      setAptChecklist(data.APT_Checklist)
    );
    fetchAPI("http://127.0.0.1:5000/api/flows", (data) =>
      setActiveFlows(data.flows)
    );

    // Cleanup on component unmount
    return () => socket.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Normal Traffic */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Normal Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={normalTraffic}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ip" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Malicious IPs */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Malicious IPs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={maliciousIPs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ip" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ff4d4f" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Normal IPs */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4 col-span-2">
        <h3 className="text-lg font-semibold mb-4">Normal IPs</h3>
        <pre>{JSON.stringify(normalIPs, null, 2)}</pre>
      </div>

      {/* Flow Statistics */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Flow Statistics</h3>
        <p>Normal Flows: {flowStats.NormalFlows || 0}</p>
        <p>Malicious Flows: {flowStats.MaliciousFlows || 0}</p>
      </div>

      {/* APT Checklist */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">APT Checklist</h3>
        <pre>{JSON.stringify(aptChecklist, null, 2)}</pre>
      </div>

      {/* Active Flows */}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4 col-span-2">
        <h3 className="text-lg font-semibold mb-4">Active Flows</h3>
        <pre>{JSON.stringify(activeFlows, null, 2)}</pre>
      </div>
    </div>
  );
};
