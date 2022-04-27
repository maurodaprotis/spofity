import { User } from "../types/User";
import { useSpotifyRead } from "./useSpotifyQuery";

export const useUser = () => {
  return useSpotifyRead<User>("/me");
};
