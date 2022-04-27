import { Device } from "../types/Device";
import { Computer } from "./Icons/Computer";
import { Smartphone } from "./Icons/Smartphone";
import { Speaker } from "./Icons/Speaker";

export const PlayingOn = ({ device }: { device: Device }) => {
  return (
    <div className="flex w-full items-center mt-6 text-neutral-400">
      {device.type === "Computer" && <Computer />}
      {device.type === "Smartphone" && <Smartphone />}
      {device.type === "Speaker" && <Speaker />}
      <span className="ml-2">Playing on {device.name}</span>
    </div>
  );
};
