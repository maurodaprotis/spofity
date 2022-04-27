import { useSpotifyMutate } from "./useSpotifyMutate";

export const usePause = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useSpotifyMutate("/me/player/pause", {
    method: "PUT",
    onSuccess,
  });
};
