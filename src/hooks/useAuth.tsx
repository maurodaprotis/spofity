import { useContext } from "react";
import { AuthContext } from "../context/UserProvider";

export const useAuth = () => {
  const { accessToken } = useContext(AuthContext);

  return { accessToken };
};
