import { Item } from "./Item";

export interface Playlist {
  id: string;
  name: string;
  tracks: Item[];
}
