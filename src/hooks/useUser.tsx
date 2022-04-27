import { User } from "../types/User";
import { useSpotify } from "./useSpotify";

export const useUser = () => {
  return useSpotify<User>("/me");
};
