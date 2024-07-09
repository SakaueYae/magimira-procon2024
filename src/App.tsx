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
import { MusicTitle, selectMusic } from "./components/hooks/selectMusic";
import { NavigationBar } from "./components/navigationBar/navigationBar";

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beat, setBeat] = useState<number>();
  const [text, setText] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [isChorus, setIsChorus] = useState<boolean>(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicTitle>("SUPERHERO");
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
            <NavigationBar
              selectedMusic={selectedMusic}
              onIconClick={() => {
                player?.requestPause();
                setIsPlaying(false);
              }}
              onMusicClick={(music) => {
                if (player) selectMusic(player, music);
                setSelectedMusic(music);
              }}
            />
            <CirclesContextProvider>
              <CircleController beat={beat ?? 0} isChorus={isChorus} />
              <CircleWithTextController text={text} isChorus={isChorus} />
            </CirclesContextProvider>
            <SeekBar position={position} onClick={seekBarOnClick} />
            <PlayAndStopButton
              music={selectedMusic}
              isPlaying={isPlaying}
              onClick={() => {
                if (isPlaying) {
                  player?.requestPause();
                  setIsPlaying(false);
                } else {
                  player?.requestPlay();
                  setIsPlaying(true);
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
              setIsPlaying(true);
            }}
            key="loadingScreen"
            onMusicClick={(music) => {
              if (player) selectMusic(player, music);
              setSelectedMusic(music);
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
  background-color: rgb(0, 0, 0);
  position: relative;
  overflow: hidden;
`;
