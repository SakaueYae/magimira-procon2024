import { useRef, useState } from "react";
import styled from "styled-components";
import { BasicCircle } from "../circles/basicCircle";
import { motion } from "framer-motion";
import { createRoot } from "react-dom/client";

type MusicCircleProps = {
  x?: number;
  y?: number;
  color: string;
  onClick: () => void;
  title: string;
  title2?: string;
};

export const MusicCircle = ({
  x,
  y,
  color,
  onClick,
  title,
  title2,
}: MusicCircleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);

  const generateCircles = () => {
    if (ref.current) {
      const interval = setInterval(() => {
        const circle = document.createElement("div");
        if (!ref.current) return;
        ref.current.appendChild(circle);
        const root = createRoot(circle);
        root.render(
          <BasicCircle
            animate={{
              scale: 3,
              opacity: 0,
            }}
            transition={{
              duration: 3,
            }}
            color={color}
            width={250}
            height={250}
          />
        );
        setTimeout(() => {
          circle.remove();
        }, 3000);
      }, 1000);
      setCurrentInterval(interval);
    } else {
      if (currentInterval) clearInterval(currentInterval);
    }
  };

  return (
    <Container
      x={x}
      y={y}
      onClick={onClick}
      color={color}
      onHoverStart={() => generateCircles()}
      onHoverEnd={() => {
        if (currentInterval) clearInterval(currentInterval);
      }}
    >
      <CirclesContainer>
        <Circle color={color} initial={{ scale: 1, opacity: 1 }} />
        <div ref={ref} style={{ position: "absolute", top: 0, left: 0 }}></div>
        <Text color={color}>
          {title}
          <br />
          {title2}
        </Text>
      </CirclesContainer>
    </Container>
  );
};

const Container = styled(motion.div)<{ x?: number; y?: number; color: string }>`
  width: 250px;
  height: 250px;
  position: absolute;
  ${({ y }) => y && `top: ${y}px`};
  ${({ x }) => x && `left: ${x}px`};
  cursor: pointer;
  color: ${({ color }) => color};
`;

const Circle = styled(BasicCircle)<{
  color?: string;
}>`
  width: 250px;
  height: 250px;
  border-color: ${(props) => props.color || "#fff"};
  position: absolute;
  top: 0;
  left: 0;
`;

const CirclesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Text = styled.p<{ color: string }>`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  font-family: serif;
  color: ${({ color }) => color};
  margin: 0;
`;
