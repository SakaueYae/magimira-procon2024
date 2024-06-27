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

    newPlayer.createFromSongUrl("https://piapro.jp/t/xEA7/20240202002556", {
      video: {
        // 音楽地図訂正履歴
        // beatId: 4592293,
        // chordId: 2727635,
        // repetitiveSegmentId: 2824326,
        // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FhZ35%2F20240130103028
        lyricId: 59420,
        lyricDiffId: 13967,
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
