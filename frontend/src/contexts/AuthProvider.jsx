import React from "react";

export const AuthContext = React.createContext();

export const useAuthContext = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = React.useState(() => {
    const user = JSON.parse(localStorage.getItem("chatapp-user"));
    if (!user) return null;
    return user;
  });
  const value = { authUser, setAuthUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
