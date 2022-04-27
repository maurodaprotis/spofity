export interface User {
  country: string;
  display_name: string;
  email: string;
  id: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  images: [{ height: number | null; url: string; width: number | null }];
}
