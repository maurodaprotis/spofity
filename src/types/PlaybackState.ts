import { Album } from "./Album";
import { Artist } from "./Artist";
import { Device } from "./Device";

export interface PlaybackState {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  timestamp: number;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
  progress_ms: number;
  is_playing: boolean;
  currently_playing_type: string;
  item: {
    album: Album;
    artists: Artist[];
    name: string;
    poularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    id: string;
  };
}
