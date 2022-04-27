import { usePlaylists } from "../hooks/usePlaylists";
import { PlaylistDetails } from "./PlaylistDetails";

export const Playlists = () => {
  const { playlists } = usePlaylists();
  return (
    <div className="flex flex-col w-full p-8 max-w-lg mx-auto items-center">
      <h2 className="font-semibold text-xl mb-4">Playlists</h2>
      {playlists.length === 0 && (
        <div className="p-2 space-y-2">
          <div className="text-gray-500 p-2 text-center">
            You don&apos;t have any playlists yet
          </div>
        </div>
      )}
      <div className="flex flex-col w-full divide-y">
        {playlists.map((playlist) => (
          <PlaylistDetails playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
};
