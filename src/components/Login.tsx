import { AUTH_URL } from "../constants";
import { Logo } from "./Logo";

export const Login = () => {
  return (
    <div className="flex min-h-screen min-w-screen text-center items-center bg-gradient-to-r from-green-600 to-neutral-600">
      <div className="flex flex-col mx-auto h-full justify-center items-center">
        <Logo className="w-full h-24 object-fit mb-12" />
        <a
          href={AUTH_URL}
          className="py-3.5 px-8 uppercase rounded-full bg-green-400 text-black font-semibold hover:bg-green-500"
        >
          Sign In With Spotify
        </a>
      </div>
    </div>
  );
};
