import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircleController } from "./components/circles/circleController";
import { CircleWithTextController } from "./components/circles/circleWithTextController";
import { usePlayer } from "./components/hooks/usePlayer";
import { Loading } from "./components/loading/loading";
import { SeekBar } from "./components/seekBar/seekBar";
import { PlayAndStopButton } from "./components/playAndStopButton/playAndStopButton";
import { AnimatePresence } from "framer-motion";
import { CirclesContextProvider } from "./context/circlesContext";
import { selectMusic } from "./components/hooks/selectMusic";

/**
 * やりたいこと
 * ・サイドバー実装
 * ・クリック（ドラッグ）した際のアニメーション
 * ・文字が溶けるエフェクトその2
 * ・duration操作
 * ・曲選択
 */

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>();
  const [text, setText] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [isChorus, setIsChorus] = useState<boolean>(false);
  const { media, player } = usePlayer();

  useEffect(() => {
    if (!player) return;

    const listener = {
      onTimeUpdate: (position: number) => {
        const nowPosition =
          Math.trunc((position * 1000) / player.video.duration) / 10;
        if (nowPosition === 100) setIsPlaying(false);
        setPosition(nowPosition);
        const nowBeat = player.findBeat(position);
        if (!nowBeat) return;
        setBeat(nowBeat.progress(position));

        const nowChorus = player.findChorus(position);
        if (nowChorus) setIsChorus(true);
        else setIsChorus(false);
      },
      onVideoReady: () => {
        let c = player.video.firstChar;
        while (c) {
          c.animate = (now, u) => {
            if (u.startTime <= now + 400) {
              setText(u.toString());
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

    return () => {
      player.removeListener(listener);
      player.dispose();
    };
  }, [player]);

  const seekBarOnClick = (newPosition: number) => {
    player?.requestMediaSeek(newPosition * player.video.duration);
  };

  return (
    <Container>
      {media}
      <AnimatePresence mode="wait">
        {isClicked ? (
          <>
            <CirclesContextProvider>
              <CircleController beat={beat ?? 0} isChorus={isChorus} />
              <CircleWithTextController text={text} isChorus={isChorus} />
            </CirclesContextProvider>
            <SeekBar position={position} onClick={seekBarOnClick} />
            <PlayAndStopButton
              isPlaying={isPlaying}
              onClick={() => {
                if (isPlaying) {
                  player?.requestPause();
                  setIsPlaying(!isPlaying);
                } else {
                  player?.requestPlay();
                  setIsPlaying(!isPlaying);
                }
              }}
            />
          </>
        ) : (
          <Loading
            isLoading={!player || !loaded}
            onClick={() => {
              setIsClicked(true);
              player?.requestPlay();
              setIsPlaying(!isPlaying);
            }}
            key="loadingScreen"
            onMusicClick={(music) => {
              if (player) selectMusic(player, music);
            }}
          />
        )}
      </AnimatePresence>
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
