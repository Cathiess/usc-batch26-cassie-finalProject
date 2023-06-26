import { useContext } from "react";
import UserContext from "../context/UserContext";
import { loginService } from "../apiServices";

const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  const login = (username, password) => {
    return loginService(username, password).then((userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    });
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout,
    setUser
  };
};

export default useUser;
