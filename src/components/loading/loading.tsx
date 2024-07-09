import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { BasicCircle } from "../circles/basicCircle";
import { MusicTitle } from "../hooks/selectMusic";
import { MusicCircle as Music } from "./musicCircle";
import { useState } from "react";

type LoadingProps = {
  isLoading: boolean;
  onClick: () => void;
  onMusicClick: (music: MusicTitle) => void;
};

export const Loading = ({ isLoading, onClick, onMusicClick }: LoadingProps) => {
  const [clickedMusic, setClickedMusic] = useState<MusicTitle | null>(null);

  const basicCircleVariant = {
    loading: {
      borderColor: [
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 1)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
    clicked: {
      scale: 1.5,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 1,
      },
    },
  };

  const handleOnClick = (music: MusicTitle) => {
    setClickedMusic(music);
    onMusicClick(music);
  };

  return (
    <Container
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      <CirclesContainer>
        <Music
          y={-300}
          color="rgb(255, 239, 97)"
          onClick={() => handleOnClick("SUPERHERO")}
          title="SUPERHERO"
          isActivated={clickedMusic === "SUPERHERO"}
        />
        <Music
          x={Math.cos(30 * (Math.PI / 180)) * 300}
          y={Math.sin(30 * (Math.PI / 180)) * -300}
          color="rgb(126, 87, 255)"
          onClick={() => handleOnClick("いつか君と話したミライは")}
          title="いつか君と"
          title2="話したミライは"
          isActivated={clickedMusic === "いつか君と話したミライは"}
        />
        <Music
          x={Math.cos(-30 * (Math.PI / 180)) * 300}
          y={Math.sin(-30 * (Math.PI / 180)) * -300}
          color="rgb(139, 252, 245)"
          onClick={() => handleOnClick("フューチャーノーツ")}
          title="フューチャーノーツ"
          isActivated={clickedMusic === "フューチャーノーツ"}
        />
        <Music
          y={250}
          color="rgb(250, 205, 245)"
          onClick={() => handleOnClick("未来交響曲")}
          title="未来交響曲"
          isActivated={clickedMusic === "未来交響曲"}
        />
        <Music
          x={Math.cos(30 * (Math.PI / 180)) * -300 - 50}
          y={Math.sin(30 * (Math.PI / 180)) * 300}
          color="rgb(212, 255, 189)"
          onClick={() => handleOnClick("リアリティ")}
          title="リアリティ"
          isActivated={clickedMusic === "リアリティ"}
        />
        <Music
          x={Math.cos(-30 * (Math.PI / 180)) * -300 - 50}
          y={Math.sin(-30 * (Math.PI / 180)) * 300}
          color="rgb(145, 3, 3)"
          onClick={() => handleOnClick("TheMarks")}
          title="The Marks"
          isActivated={clickedMusic === "TheMarks"}
        />
        <CenterCircle
          animate="loading"
          variants={basicCircleVariant}
          onClick={onClick}
          isLoading={isLoading}
          exit={"clicked"}
          width={250}
          height={250}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Text
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                key="loading"
              >
                曲を <br />
                選択してください
              </Text>
            ) : (
              <Text
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                key="loaded"
              >
                Play
              </Text>
            )}
          </AnimatePresence>
        </CenterCircle>
      </CirclesContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(motion.p)`
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-family: serif;
  margin: 0;
  text-align: center;
`;

const CenterCircle = styled(BasicCircle)<{ isLoading: boolean }>`
  cursor: ${(props) => (props.isLoading ? "default" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CirclesContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
