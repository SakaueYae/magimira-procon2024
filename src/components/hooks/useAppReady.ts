import { useEffect, useState } from "react";
import { usePlayer } from "./usePlayer";

export const useAppReady = () => {
  const { player } = usePlayer();
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    if (!player) return;
    const listener = {
      onAppReady: () => {
        setIsAppReady(true);
      },
    };

    player.addListener(listener);

    return () => {
      player.removeListener(listener);
    };
  }, [player]);

  return isAppReady;
};
