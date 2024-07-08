import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";

type SeekBarProps = {
  position: number;
  onClick: (newPosition: number) => void;
};

export const SeekBar = ({ position, onClick }: SeekBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const width = window.innerWidth;
    const newPosition = x / width;
    onClick(newPosition);
  };

  useEffect(() => {
    controls.start({
      width: `${position}%`,
    });
  }, [controls, position]);

  return (
    <Container onClick={handleClick} ref={ref}>
      <Bar initial={{ width: "0px" }} animate={controls} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 10px;
  background-color: gray;
  position: absolute;
  bottom: 0;
  cursor: pointer;
`;

const Bar = styled(motion.div)`
  height: 100%;
  background-color: white;
`;
