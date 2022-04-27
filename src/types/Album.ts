import { Artist } from "./Artist";

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      height: number | null;
      url: string;
      width: number | null;
    }
  ];
  name: string;
  type: string;
  track_number: number;
}
