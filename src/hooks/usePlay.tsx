import { useSpotifyMutate } from "./useSpotifyMutate";

export const usePlay = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useSpotifyMutate("/me/player/play", {
    method: "PUT",
    onSuccess,
  });
};
