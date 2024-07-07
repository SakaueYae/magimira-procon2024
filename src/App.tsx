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

/**
 * やりたいこと
 * ・サイドバー実装
 * ・クリック（ドラッグ）した際のアニメーション
 * ・要素の重なりによる色の変化
 * ・文字が溶けるエフェクトその2
 * ・duration操作
 * ・曲選択
 */

function App() {
  // const [player, setPlayer] = useState<Player>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>();
  const [text, setText] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");
  const [position, setPosition] = useState<number>(0);
  const [isChorus, setIsChorus] = useState<boolean>(false);
  const { media, player } = usePlayer();

  useEffect(() => {
    if (!player) return;

    const listener = {
      onTimeUpdate: (position: number) => {
        if (position === 0) setPhrase("");
        setPosition(Math.trunc((position * 1000) / player.video.duration) / 10);
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

  const seekBarOnClick = (newPosition: number) => {
    player?.requestMediaSeek(newPosition * player.video.duration);
  };

  return (
    <Container
      onClick={() => {
        if (isClicked) handleClick();
      }}
    >
      {media}
      {/* <Circle x={100} y={100} text="test" /> */}
      <AnimatePresence mode="wait">
        {isClicked ? (
          <>
            <CirclesContextProvider>
              <CircleController beat={beat ?? 0} isChorus={isChorus} />
              {/**
               * @todo
               * 1. 前のtextと同じphraseでない場合に座標を保持
               * 2. 前のtextと比較して同じphraseの場合、前の要素の付近に配置
               */}
              <CircleWithTextController text={text} phrase={phrase} />
            </CirclesContextProvider>
            <SeekBar position={position} onClick={seekBarOnClick} />
            <PlayAndStopButton
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
