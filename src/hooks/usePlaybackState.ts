import { PlaybackState } from "../types/PlaybackState";
import { useSpotify } from "./useSpotify";

export const usePlaybackState = () => {
  return useSpotify<PlaybackState | undefined>("/me/player");
};
