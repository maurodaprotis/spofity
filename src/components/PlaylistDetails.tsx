import { useState } from "react";
import { usePlaylists } from "../hooks/usePlaylists";
import { Playlist } from "../types/Playlist";
import { ChevronDown } from "./Icons/ChevronDown";
import { ChevronRight } from "./Icons/ChevronRight";
import { Pencil } from "./Icons/Pencil";
import { Trash } from "./Icons/Trash";

export const PlaylistDetails = ({ playlist }: { playlist: Playlist }) => {
  const [open, setOpen] = useState(false);
  const { removeTrack, removePlaylist, renamePlaylist } = usePlaylists();

  return (
    <div className="">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex text-left items-center py-4 px-2 pr-4"
      >
        {playlist.name}
        <span className="ml-auto">
          {open ? <ChevronDown /> : <ChevronRight />}
        </span>
      </button>

      {open && (
        <div className="p-2 space-y-2">
          {playlist.tracks.length === 0 && (
            <div className="text-gray-500 p-2 text-center">
              This playlist is empty
            </div>
          )}
          {playlist.tracks.map((track) => (
            <div key={track.id} className="flex items-center">
              <img
                className="h-12 w-12"
                src={track.albumCover}
                alt={`${track.name} | ${track.album}`}
              ></img>
              <div className="ml-2 flex flex-col">
                <p className="text-gray-600 font-semibold text-sm">
                  {track.name}
                </p>
                <p className="text-gray-500 text-sm ">{track.artists}</p>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="border-none inline-flex justify-center w-full rounded-full border px-2 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  aria-label="Remove from playlist"
                  onClick={() => removeTrack(playlist, track)}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
          <div className="flex text-gray-500 p-2 justify-center">
            <button
              className="flex items-center text-blue-400 rounded px-2 hover:bg-blue-100"
              onClick={() => {
                const newName = prompt(
                  "Enter new playlist name",
                  playlist.name
                );
                if (newName) {
                  renamePlaylist(playlist, newName);
                }
              }}
            >
              <Pencil />
              <span className="ml-2">
                Rename<span className="hidden sm:inline"> Playlist</span>
              </span>
            </button>
            <button
              className="flex items-center text-red-400 rounded px-2 hover:bg-red-100"
              onClick={() => removePlaylist(playlist)}
            >
              <Trash />
              <span className="ml-2">
                Delete<span className="hidden sm:inline"> Playlist</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
