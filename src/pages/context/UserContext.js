import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [vendorId, setVendorId] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ vendorId, setVendorId, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);