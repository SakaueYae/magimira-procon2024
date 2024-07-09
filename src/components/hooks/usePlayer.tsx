import { useEffect, useMemo, useState } from "react";
import { Player } from "textalive-app-api";

/**
 * このままだと呼び出されるごとにPlayerが生成されてしまうので、修正する必要あり
 */
export const usePlayer = () => {
  const [mediaElement, setMediaElement] = useState<HTMLDivElement | null>();
  const [player, setPlayer] = useState<Player>();

  const media = useMemo(() => <div ref={setMediaElement} />, []);

  useEffect(() => {
    if (!mediaElement) return;
    const newPlayer = new Player({
      app: {
        token: "uL12r3TY3XrQUFIw",
      },
    });

    const listener = {
      onPlay: () => console.log("play"),
      onPause: () => console.log("pause"),
      onStop: () => console.log("stop"),
    };

    newPlayer.addListener(listener);
    setPlayer(newPlayer);

    return () => {
      newPlayer.removeListener(listener);
      newPlayer.dispose();
    };
  }, [mediaElement]);

  return { media, player };
};
