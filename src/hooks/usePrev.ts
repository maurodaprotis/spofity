import { useSpotifyMutate } from "./useSpotifyMutate";

export const usePrev = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useSpotifyMutate("/me/player/previous", {
    method: "POST",
    onSuccess,
  });
};
