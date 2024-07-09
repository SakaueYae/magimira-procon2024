import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { MusicTitle, musicObj } from "../hooks/selectMusic";

type PlayAndStopButtonProps = {
  music: MusicTitle;
  isPlaying: boolean;
  onClick: () => void;
};

export const PlayAndStopButton = ({
  music,
  isPlaying,
  onClick,
}: PlayAndStopButtonProps) => {
  const controls = useAnimationControls();
  const handleTap = () => {
    onClick();
    if (isPlaying) controls.start("stop");
    else controls.start("play");
  };

  useEffect(() => {
    if (isPlaying) controls.start("play");
    else controls.start("stop");
  }, [controls, isPlaying]);

  const variants = {
    play: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    stop: {
      clipPath: "polygon(0 0, 100% 50%, 0 100%, 0 100%)",
      rotate: 0,
    },
  };

  return (
    <Container>
      <Music color={musicObj[music].color}>
        {music === "TheMarks" ? "The Marks" : music}
      </Music>
      <ButtonContainer>
        <ButtonIcon
          animate={controls}
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          initial="play"
          onTap={handleTap}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  position: absolute;
  right: 0;
  bottom: 20px;
`;

const ButtonContainer = styled(motion.button)`
  border-radius: 50%;
  border: 2px solid rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: rgb(255, 255, 255);
`;

const Music = styled.div<{ color: string }>`
  font-size: 30px;
  font-family: serif;
  color: ${({ color }) => color};
  text-shadow: ${({ color }) => `0 0 10px ${color},0 0 15px ${color}`};
`;
