export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
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
  popularity: number;
  type: string;
  uri: string;
}
