import React from "react";
import { useAuthContext } from "./AuthProvider";
import io from "socket.io-client";

export const SocketContext = React.createContext();
export const useSocketContext = () => React.useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const { authUser } = useAuthContext();

  React.useEffect(() => {
    if (authUser) {
      const socket = io("http://127.0.0.1:5000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      // socket.on() is used to listen to the events. It can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const value = { socket, onlineUsers };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
