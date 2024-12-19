import React, { useEffect, useState } from "react";
import { useSocket } from "../../Context/Socket";

const TrafficeDetails = () => {
  const socket = useSocket();
  const [flows, setFlows] = useState([]); // Keep flows as an array

  useEffect(() => {
    if (!socket) return; // Ensure socket is initialized


    // Listen for 'newresult' event
    socket.on("newresult", (data) => {
      const stripHTML = (html) => html.replace(/<[^>]*>/g, "");
      const cleanAttackType = data?.result
        .slice(12)
        .map((item) => stripHTML(item))
        .join(", ");
      // Safely extract details and add to the flows array
      const flowDetails = {
        flowID: data?.result[0] || "N/A", // Flow ID
        ipAddress: stripHTML(data?.result[1]) || "N/A", // Strip HTML from IP Address
        attackType: cleanAttackType || "None", // Clean attack types
        severity: stripHTML(data?.result[11]) || "N/A", // Strip HTML from Severity
        remediationAction: data?.result[10] || "N/A", // Traffic type
        timestamp: data?.result[5] || "N/A", // Start time
      };

      setFlows((prevFlows) => [flowDetails, ...prevFlows]); // Append new data
    });

    socket.on("connect", () =>
      console.log("✅ Connected to WebSocket server.")
    );
    socket.on("disconnect", () =>
      console.warn("⚠️ Disconnected from WebSocket server.")
    );

    // Cleanup event listeners on unmount
    return () => {
      console.log("Cleaning up TrafficDetails listeners...");
      socket.off("newresult");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);


  return (
    <div className="rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Details</h3>
        <div className="overflow-x-auto max-h-[400px]">
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
              {flows.map((flow, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{flow.flowID}</td>
                  <td className="border px-4 py-2">{flow.ipAddress}</td>
                  <td className="border px-4 py-2">{flow.attackType}</td>
                  <td className="border px-4 py-2">{flow.severity}</td>
                  <td className="border px-4 py-2">{flow.remediationAction}</td>
                  <td className="border px-4 py-2">{flow.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrafficeDetails;
