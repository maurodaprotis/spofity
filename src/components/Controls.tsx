import { useNext } from "../hooks/useNext";
import { usePause } from "../hooks/usePause";
import { usePlay } from "../hooks/usePlay";
import { usePrev } from "../hooks/usePrev";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { Pause } from "./Icons/Pause";
import { Play } from "./Icons/Play";

export const Controls = ({
  onChange,
  isPlaying,
}: {
  onChange: () => void;
  isPlaying: boolean;
}) => {
  const { mutate: nextTrack } = useNext({ onSuccess: onChange });
  const { mutate: previousTrack } = usePrev({ onSuccess: onChange });
  const { mutate: playTrack } = usePlay({ onSuccess: onChange });
  const { mutate: pauseTrack } = usePause({ onSuccess: onChange });

  return (
    <div className="flex w-full items-center mt-8 justify-center space-x-2">
      <button
        type="button"
        className="border-none inline-flex justify-center rounded-full border  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        aria-label="Previous Song"
        onClick={() => previousTrack()}
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        className="border-none inline-flex justify-center rounded-full border bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        aria-label="Next Song"
        onClick={() => (isPlaying ? pauseTrack() : playTrack())}
      >
        {isPlaying ? <Pause /> : <Play className="h-8 w-8" />}
      </button>
      <button
        type="button"
        className="border-none inline-flex justify-center rounded-full border bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        aria-label="Next Song"
        onClick={() => nextTrack()}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
