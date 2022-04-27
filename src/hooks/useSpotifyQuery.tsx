import { SPOTIFY_API_URL } from "../constants";
import useFetch from "./useFetch";
import { useAuth } from "./useAuth";

export function useSpotifyRead<T>(url: string) {
  const { accessToken } = useAuth();

  return useFetch<T>(`${SPOTIFY_API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
