import { useState } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { Player } from "./Player";
import { Playlists } from "./Playlists";

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<"play" | "playlists">("play");
  return (
    <div className="flex flex-col min-h-screen bg-white relative space-y-12">
      <Header />
      {selectedTab === "play" && <Player />}
      {selectedTab === "playlists" && <Playlists />}
      <BottomNav active={selectedTab} setActive={setSelectedTab} />
    </div>
  );
};
