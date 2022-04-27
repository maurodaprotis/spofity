import { usePlaylists } from "../hooks/usePlaylists";
import { PlaylistDetails } from "./PlaylistDetails";

export const Playlists = () => {
  const { playlists } = usePlaylists();
  return (
    <div className="flex flex-col w-full p-8 max-w-lg mx-auto items-center">
      <h2 className="font-light text-xl mb-4">Playlists</h2>
      <div className="flex flex-col w-full divide-y">
        {playlists.map((playlist) => (
          <PlaylistDetails playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
};
