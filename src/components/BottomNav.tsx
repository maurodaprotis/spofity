import { Library } from "./Icons/Library";
import { Play } from "./Icons/Play";

export const BottomNav = ({
  active,
  setActive,
}: {
  active: "play" | "playlists";
  setActive: (active: "play" | "playlists") => void;
}) => {
  return (
    <nav className="fixed bottom-0 flex items-center content-center w-full h-16">
      <div className="flex space-x-4 items-center justify-center w-full h-full">
        <button
          className={`flex p-2 w-32 hover:text-neutral-600 ${
            active === "play" ? " font-semibold" : " text-neutral-500"
          }`}
          onClick={() => setActive("play")}
        >
          <Play />
          <span className="ml-2">Player</span>
        </button>
        <button
          className={`flex p-2 w-32 hover:text-neutral-600 ${
            active === "playlists" ? " font-semibold" : " text-neutral-500"
          }`}
          onClick={() => setActive("playlists")}
        >
          <Library />
          <span className="ml-2">Playlists</span>
        </button>
      </div>
    </nav>
  );
};
