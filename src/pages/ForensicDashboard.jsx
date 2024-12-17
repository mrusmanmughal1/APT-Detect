import React from 'react';
import { Shield, AlertTriangle, Bug, Lock } from 'lucide-react';
import Sidebar from '../components/SideBar';

const ForensicDashboard = () => {
  const incidents = [
    {
      destination: "192.168.1.15",
      source: "10.0.0.25",
      timestamp: "2024-11-14 08:12:30",
      classification: "Suspicious Activity",
      severity: "High"
    },
    {
      destination: "192.168.1.15",
      source: "10.0.0.25",
      timestamp: "2024-11-14 08:15:45",
      classification: "Denial Of Service",
      severity: "Medium"
    },
    {
      destination: "192.168.1.15",
      source: "10.0.0.25",
      timestamp: "2024-11-14 08:15:45",
      classification: "Potential Malware",
      severity: "Medium"
    },
    {
      destination: "192.168.1.15",
      source: "10.0.0.25",
      timestamp: "2024-11-14 08:15:45",
      classification: "Unauthorized Access",
      severity: "High"
    }
  ];

  const packetDetails = {
    timestamp: "2024-11-14 08:15:45",
    sourceIP: "192.168.1.10",
    destinationIP: "10.0.0.50",
    protocol: "FTP",
    severity: "Medium",
    payload: "45 00 00 3c 1c 46 40 00 40 06 b1 c6 c0 a8 00 68",
    indicators: "FTP command detected that does not match known safe patterns.",
    metadata: {
      packetSize: "500 bytes",
      ttl: "128"
    }
  };

  const getIcon = (classification) => {
    switch (classification) {
      case "Suspicious Activity":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Denial Of Service":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "Potential Malware":
        return <Bug className="h-4 w-4 text-purple-500" />;
      case "Unauthorized Access":
        return <Lock className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <>
    <Sidebar />
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto w-[90%]">
        <h1 className="text-3xl font-bold text-center mb-6 text-navy-800">Forensic Analysis</h1>
        
        <div className="grid gap-4 ">
          {/* Incidents Table Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Incident Log</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-sm font-medium text-gray-600">Dest IP</th>
                    <th className="p-3 text-sm font-medium text-gray-600">Source IP</th>
                    <th className="p-3 text-sm font-medium text-gray-600">Time</th>
                    <th className="p-3 text-sm font-medium text-gray-600">Class</th>
                    <th className="p-3 text-sm font-medium text-gray-600">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-sm">{incident.destination}</td>
                      <td className="p-3 text-sm">{incident.source}</td>
                      <td className="p-3 text-sm">{incident.timestamp}</td>
                      <td className="flex items-center gap-2 p-3 text-sm">
                        {getIcon(incident.classification)}
                        <span>{incident.classification}</span>
                      </td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          incident.severity === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {incident.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Packet Details Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Packet Details</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium text-gray-600">Timestamp:</div>
                <div className="text-sm text-gray-900">{packetDetails.timestamp}</div>
                <div className="text-sm font-medium text-gray-600">Source IP:</div>
                <div className="text-sm text-gray-900">{packetDetails.sourceIP}</div>
                <div className="text-sm font-medium text-gray-600">Destination IP:</div>
                <div className="text-sm text-gray-900">{packetDetails.destinationIP}</div>
                <div className="text-sm font-medium text-gray-600">Protocol:</div>
                <div className="text-sm text-gray-900">{packetDetails.protocol}</div>
                <div className="text-sm font-medium text-gray-600">Severity:</div>
                <div className="text-sm text-gray-900">{packetDetails.severity}</div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Payload Data:</div>
                <div className="rounded bg-gray-50 p-3 font-mono text-xs text-gray-700">
                  {packetDetails.payload}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Anomaly Indicators:</div>
                <div className="text-sm text-red-600">
                  {packetDetails.indicators}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-gray-600">Metadata:</div>
                <div className="text-sm text-gray-900">
                  <div className="mb-1">Packet Size: {packetDetails.metadata.packetSize}</div>
                  <div>TTL: {packetDetails.metadata.ttl}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForensicDashboard;