import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedAdmin = localStorage.getItem("admin");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  const login = (data) => {
    setToken(data.token);
    setAdmin(data.admin);

    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));
  };

  const logout = () => {
    setToken("");
    setAdmin(null);

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;