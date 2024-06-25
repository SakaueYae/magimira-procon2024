import { useEffect, useMemo, useState, useRef, SetStateAction } from "react";
import { IPlayerApp, Player } from "textalive-app-api";
import { Circle } from "./components/circles/circle";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import { CircleController } from "./components/circles/circleController";
import { CircleWithTextController } from "./components/circles/circleWithTextController";
import { usePlayer } from "./components/hooks/usePlayer";
import { Loading } from "./components/loading/loading";

function App() {
  // const [player, setPlayer] = useState<Player>();
  const [app, setApp] = useState<Player["app"]>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>();
  const [text, setText] = useState<string>("");
  const { media, player } = usePlayer();

  useEffect(() => {
    if (!player) return;

    const listener = {
      onAppReady: (app: SetStateAction<IPlayerApp | undefined>) => {
        setApp(app);
        console.log(app);
      },
      onTimeUpdate: (position: number) => {
        const nowBeat = player.findBeat(position);
        if (!nowBeat) return;
        setBeat(nowBeat.progress(position));
      },
      onVideoReady: () => {
        let c = player.video.firstChar;
        while (c && c.next) {
          c.animate = (now, u) => {
            if (u.contains(now)) {
              setText(u.toString());
            }
          };
          c = c.next;
        }
      },
    };

    player.addListener(listener);
    // setPlayer(newPlayer);

    return () => {
      player.removeListener(listener);
      player.dispose();
    };
  }, [player]);

  return (
    <Container>
      {media}
      {(!player || !app) && <Loading isLoading={!app} />}
      <CircleController beat={beat ?? 0} />
      <CircleWithTextController text={text} />
      {/* <Circle x={100} y={100} text="test" /> */}
      {player && (
        <button
          onClick={() => {
            if (isPlaying) {
              player?.requestPause();
              setIsPlaying(!isPlaying);
            } else {
              player?.requestPlay();
              setIsPlaying(!isPlaying);
            }
          }}
        >
          再生
        </button>
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
  position: relative;
  overflow: hidden;
`;
