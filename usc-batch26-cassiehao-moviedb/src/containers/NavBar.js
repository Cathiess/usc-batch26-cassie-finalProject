import React from "react";
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";
import useUser from "../hooks/useUser";

const NavBar = () => {
  const { user, logout } = useUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <Header loginButton={<LoginButton user={user} onLogout={handleLogout} />} />
  );
};

export default NavBar;
