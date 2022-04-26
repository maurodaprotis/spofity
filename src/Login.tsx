const { VITE_CLIENT_ID, VITE_REDIRECT_URI } = import.meta.env;

const CLIENT_ID = VITE_CLIENT_ID;
const REDIRECT_URI = VITE_REDIRECT_URI;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export const Login = () => {
  return (
    <div className="bg-red-500">
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};
