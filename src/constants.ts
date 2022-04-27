const { VITE_API_URL, VITE_CLIENT_ID, VITE_REDIRECT_URI } = import.meta.env;

export const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export const API_URL = VITE_API_URL;

export const CLIENT_ID = VITE_CLIENT_ID;

export const REDIRECT_URI = VITE_REDIRECT_URI;

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state`;
