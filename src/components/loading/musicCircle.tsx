import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BasicCircle } from "../circles/basicCircle";
import { motion, useAnimation } from "framer-motion";
import { createRoot } from "react-dom/client";

type MusicCircleProps = {
  x?: number;
  y?: number;
  color: string;
  onClick: () => void;
  title: string;
  title2?: string;
  isActivated: boolean;
};

export const MusicCircle = ({
  x,
  y,
  color,
  onClick,
  title,
  title2,
  isActivated,
}: MusicCircleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentInterval = useRef<number | null>(null);
  const controls = useAnimation();
  const isFirstHover = useRef<boolean>(true);

  const generateCircles = () => {
    if (ref.current) {
      const interval = setInterval(() => {
        const circle = document.createElement("div");
        if (!ref.current) return;
        ref.current.appendChild(circle);
        const root = createRoot(circle);
        root.render(
          <BasicCircle
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: 1.5,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
            }}
            color={color}
            width={250}
            height={250}
          />
        );
        setTimeout(() => {
          circle.remove();
        }, 3000);
      }, 2000);
      currentInterval.current = interval;
    } else {
      if (currentInterval.current) clearInterval(currentInterval.current);
    }
  };

  useEffect(() => {
    if (isActivated) {
      controls.start({
        scale: 1.5,
        textShadow: `0 0 10px ${color},0 0 15px ${color}`,
        transition: { duration: 1 },
      });
    } else {
      controls.start({
        scale: 1,
        textShadow: "none",
        transition: { duration: 1 },
      });
    }
  }, [color, controls, isActivated]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.addEventListener("mouseover", () => {
      if (isFirstHover.current) {
        generateCircles();
        isFirstHover.current = false;
      }
    });

    containerRef.current.addEventListener("mouseleave", () => {
      if (currentInterval.current) clearInterval(currentInterval.current);
      isFirstHover.current = true;
    });
  }, []);

  return (
    <Container
      x={x}
      y={y}
      onClick={() => {
        if (currentInterval.current) clearInterval(currentInterval.current);
        onClick();
      }}
      color={color}
      animate={controls}
      ref={containerRef}
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
  color: string;
}>`
  width: 250px;
  height: 250px;
  border-color: ${(props) => props.color};
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
