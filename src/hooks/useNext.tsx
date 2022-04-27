import { useSpotifyMutate } from "./useSpotifyMutate";

export const useNext = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useSpotifyMutate("/me/player/next", {
    method: "POST",
    onSuccess,
  });
};
