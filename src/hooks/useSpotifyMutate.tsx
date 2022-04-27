import { SPOTIFY_API_URL } from "../constants";
import { useAuth } from "./useAuth";

export const useSpotifyMutate = (
  url: string,
  {
    onSuccess,
    method,
  }: {
    onSuccess?: () => void;
    method: "POST" | "PUT";
  } = {
    method: "POST",
  }
) => {
  const { accessToken } = useAuth();

  const mutate = () => {
    fetch(`${SPOTIFY_API_URL}${url}`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => onSuccess?.());
  };

  return { mutate };
};
