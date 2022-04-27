import { PlaybackState } from "../types/PlaybackState";
import { useSpotifyRead } from "./useSpotifyQuery";

export const usePlaybackState = () => {
  return useSpotifyRead<PlaybackState | undefined>("/me/player");
};
