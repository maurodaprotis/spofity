import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { usePlaylists } from "../hooks/usePlaylists";
import { Item } from "../types/Item";
import { Plus } from "./Icons/Plus";

export const AddToPlaylist = ({ currentItem }: { currentItem: Item }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => setOpen(false));

  const { playlists, addPlaylist, addTrack, removeTrack } = usePlaylists();

  return (
    <div className="relative inline-block text-left" ref={wrapperRef}>
      <div>
        <button
          type="button"
          className="border-none inline-flex justify-center w-full rounded-full border px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={open ? "true" : "false"}
          aria-haspopup="true"
          aria-label="Add to playlist"
          onClick={() => setOpen(!open)}
        >
          <Plus />
        </button>
      </div>
      {open && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {playlists.map((playlist) => {
              const hasTrack = playlist.tracks.find(
                (track) => track.id === currentItem.id
              );

              return (
                <button
                  key={playlist.name}
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
                  role="menuitem"
                  onClick={() => {
                    if (hasTrack) {
                      removeTrack(playlist, currentItem);
                    } else {
                      addTrack(playlist, currentItem);
                    }
                    setOpen(false);
                  }}
                >
                  {playlist.name} {hasTrack && <span>✓</span>}
                </button>
              );
            })}
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
              role="menuitem"
              onClick={() => {
                const name = prompt(
                  "Enter playlist name",
                  `Playlist ${playlists.length + 1}`
                );
                if (name) {
                  addPlaylist({
                    id: self.crypto.randomUUID(),
                    name,
                    tracks: [currentItem],
                  });
                }
                setOpen(false);
              }}
            >
              Add to new playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
