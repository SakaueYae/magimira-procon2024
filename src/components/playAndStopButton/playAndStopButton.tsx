import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

type PlayAndStopButtonProps = {
  onClick: () => void;
};

export const PlayAndStopButton = ({ onClick }: PlayAndStopButtonProps) => {
  const controls = useAnimationControls();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const handleTap = () => {
    onClick();
    if (isPlaying) controls.start("stop");
    else controls.start("play");
    setIsPlaying(!isPlaying);
  };
  const variants = {
    play: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      // rotate: 180,
    },
    stop: {
      clipPath: "polygon(0 0, 100% 50%, 0 100%, 0 100%)",
      rotate: 0,
    },
  };

  return (
    <Container>
      <ButtonIcon
        animate={controls}
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial="play"
        onTap={handleTap}
      />
    </Container>
  );
};

const Container = styled(motion.button)`
  border-radius: 50%;
  border: 2px solid #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  bottom: 20px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: #fff;
`;
