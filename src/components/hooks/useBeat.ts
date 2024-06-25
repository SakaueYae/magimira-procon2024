import { useEffect, useState } from "react";
import { usePlayer } from "./usePlayer";

export const useBeat = () => {
  const { player } = usePlayer();

  const [beat, setBeat] = useState<number>(0);

  useEffect(() => {
    if (!player) return;

    const listener = {
      onTimeUpdate: (position: number) => {
        const nowBeat = player.findBeat(position);
        if (!nowBeat) return;
        setBeat(nowBeat.progress(position));
      },
    };
    
    

    player.addListener(listener);

    return () => {
      player.removeListener(listener);
    };
  }, [player]);

  return beat;
};
