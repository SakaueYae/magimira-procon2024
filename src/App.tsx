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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>();
  const [text, setText] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");
  const { media, player } = usePlayer();

  useEffect(() => {
    if (!player) return;

    const listener = {
      onTimeUpdate: (position: number) => {
        const nowBeat = player.findBeat(position);
        if (!nowBeat) return;
        setBeat(nowBeat.progress(position));
      },
      onVideoReady: () => {
        let c = player.video.firstChar;
        while (c && c.next) {
          c.animate = (now, u) => {
            if (u.startTime <= now + 400) {
              setText(u.toString());
              setPhrase(u.parent.parent.toString() ?? "");
            }
          };
          c = c.next;
        }
      },
      onTimerReady: () => {
        setLoaded(true);
      },
    };

    player.addListener(listener);
    // setPlayer(newPlayer);

    return () => {
      player.removeListener(listener);
      player.dispose();
    };
  }, [player]);

  const handleClick = () => {
    setBeat(90);
  };

  return (
    <Container
      onClick={() => {
        if (isClicked) handleClick();
      }}
    >
      {media}
      {/* <Circle x={100} y={100} text="test" /> */}
      {isClicked ? (
        <>
          <CircleController beat={beat ?? 0} />
          {/**
           * @todo
           * 1. 前のtextと同じphraseでない場合に座標を保持
           * 2. 前のtextと比較して同じphraseの場合、前の要素の付近に配置
           */}
          <CircleWithTextController text={text} phrase={phrase} />
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
        </>
      ) : (
        <Loading
          isLoading={!player || !loaded}
          onClick={() => {
            setIsClicked(true);
            player?.requestPlay();
            setIsPlaying(!isPlaying);
          }}
        />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: relative;
  overflow: hidden;
`;
