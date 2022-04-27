import { usePlaybackState } from "../hooks/usePlaybackState";
import { AddToPlaylist } from "./AddToPlaylist";
import { PlayingOn } from "./PlayingOn";

const NotPlaybackState = () => (
  <div className="flex flex-col w-full p-8 max-w-lg mx-auto items-center">
    <p className="text-lg italic text-neutral-400">
      Play some music on{" "}
      <a
        className="text-black font-semibold normal hover:underline"
        href="https://open.spotify.com/"
        target="_blank"
        rel="noreferrer"
      >
        Spotify
      </a>{" "}
      to start
    </p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="animate-pulse flex flex-col w-full p-8 max-w-lg mx-auto items-center">
    <div className="h-56 w-56 rounded-sm bg-gray-200 mb-4 shadow-lg" />
    <div className="mb-4">
      <div className="bg-gray-300 h-2 w-16 py-2 rounded"></div>
    </div>
    <div className="flex w-full items-center">
      <div className="flex-1">
        <p className="bg-gray-300 font-semibold h-6 w-32 mb-1 rounded"></p>
        <p className="bg-gray-300 font-semibold h-6 w-40 mb-1 rounded"></p>
      </div>
    </div>
    <div className="flex items-center bg-gray-300 rounded mt-6 h-6 w-48 self-start"></div>
  </div>
);

export const Player = () => {
  const { data, error, isLoading } = usePlaybackState();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return <NotPlaybackState />;
  }

  const albumCover = data?.item.album.images.sort(
    (a, b) => Number(b.height) - Number(a.height)
  )[0]?.url;

  const artists = data?.item.artists.map((artist) => artist.name).join(", ");
  const name = data?.item.name;
  const album = data?.item.album.name;
  const id = data?.item.id;

  return (
    <div className="flex flex-col w-full p-8 max-w-lg mx-auto items-center">
      <img
        className="h-56 w-56 rounded-sm bg-gray-200 mb-4 shadow-lg"
        src={albumCover}
        alt={`${data.item.name} | ${data.item.album.name}`}
        height={192}
        width={192}
      ></img>
      <div className="mb-4">
        <p className="text-gray-500 text-sm">{album}</p>
      </div>
      <div className="flex w-full items-center">
        <div className="flex-1">
          <p className="text-gray-600 font-semibold text-lg">{name}</p>
          <p className="text-gray-500">{artists}</p>
        </div>
        <div className="h-full w-8">
          <AddToPlaylist
            currentItem={{
              album,
              albumCover,
              artists,
              name,
              id,
            }}
          />
        </div>
      </div>
      <PlayingOn device={data?.device} />
    </div>
  );
};
