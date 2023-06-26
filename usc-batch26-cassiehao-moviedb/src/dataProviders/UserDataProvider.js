import React, { useState } from "react";
import UserContext from "../context/UserContext";

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const contextValue = {
    user,
    setUser
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserDataProvider;
