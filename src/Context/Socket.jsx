import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const socketInstance = io("http://127.0.0.1:5000/test", {
      transports: ["websocket"], // Enforce WebSocket
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    // Debugging connection events
    socketInstance.on("connect", () => {
      console.log("✅ Connected to the WebSocket server.");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Connection error:", error.message);
    });

    socketInstance.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected:", reason);
    });

    return socketInstance;
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
