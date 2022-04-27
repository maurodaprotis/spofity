import { Item } from "../types/Item";
import { Playlist } from "../types/Playlist";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

/*
 * Playlists hook would control the playlists state and actions
 * We could easely replace the local storage with a database
 * without affectign the code
 */
export const usePlaylists = () => {
  const { data: user } = useUser();

  /*
   * We want to store the playlists in local storage so that we can
   * persist them across sessions.
   *
   * The playlist must be specific for each user
   */
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    `${user?.id}-playlists`,
    []
  );

  /*
   * Add a playlist to the list of playlists
   */
  const addPlaylist = (playlist: Playlist) => {
    setPlaylists([...playlists, playlist]);
  };

  /*
   * Add a track to a playlist
   */
  const addTrack = (playlist: Playlist, track: Item) => {
    const updatedPlaylist = {
      ...playlist,
      tracks: [...playlist.tracks, track],
    };

    const playlistIndex = playlists.findIndex((p) => p.id === playlist.id);

    const updatedPlaylists = [
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1),
    ];

    setPlaylists(updatedPlaylists);
  };

  /*
   * Remove a track from a playlist
   */
  const removeTrack = (playlist: Playlist, track: Item) => {
    const updatedPlaylist = {
      ...playlist,
      tracks: playlist.tracks.filter((t) => t.id !== track.id),
    };

    const playlistIndex = playlists.findIndex((p) => p.id === playlist.id);

    const updatedPlaylists = [
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1),
    ];

    setPlaylists(updatedPlaylists);
  };

  /*
   * Remove a playlist from the list of playlists
   */
  const removePlaylist = (playlist: Playlist) => {
    const playlistIndex = playlists.findIndex((p) => p.id === playlist.id);

    const updatedPlaylists = [
      ...playlists.slice(0, playlistIndex),
      ...playlists.slice(playlistIndex + 1),
    ];

    setPlaylists(updatedPlaylists);
  };

  /*
   * Rename a playlist
   */
  const renamePlaylist = (playlist: Playlist, newName: string) => {
    const playlistIndex = playlists.findIndex((p) => p.id === playlist.id);

    const updatedPlaylists = [
      ...playlists.slice(0, playlistIndex),
      { ...playlist, name: newName },
      ...playlists.slice(playlistIndex + 1),
    ];

    setPlaylists(updatedPlaylists);
  };

  return {
    playlists,
    addPlaylist,
    addTrack,
    removeTrack,
    removePlaylist,
    renamePlaylist,
  };
};
