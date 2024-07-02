import styled from "styled-components";
import { motion } from "framer-motion";
import { BasicCircle } from "./basicCircle";

type CircleWithTextProps = {
  x: number;
  y: number;
  text: string;
  color?: string;
  isChorus?: boolean;
};

export const CircleWithText = ({
  x,
  y,
  text,
  color,
  isChorus,
}: CircleWithTextProps) => {
  const borderColor = color
    ? [color, color.slice(0, -2) + "0)", color.slice(0, -2) + "0)"]
    : [
        "rgba(255, 255, 255, 1)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 255, 255, 0)",
      ];

  return (
    <Container x={x} y={y}>
      <BasicCircle
        animate={{
          scale: text || !isChorus ? [0.5, 3, 3] : [0.5, 5, 5],
          borderColor,
        }}
        transition={{ duration: 4, times: [0, 0.25, 1] }}
        color={color}
      />
      <Text
        animate={{
          scale: [0.5, 3, 3],
          opacity: [1, 1, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(10px)"],
        }}
        transition={{ duration: 4, times: [0, 0.25, 1] }}
      >
        {text}
      </Text>
    </Container>
  );
};

const Container = styled.div<{
  x: number;
  y: number;
}>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const Text = styled(motion.p)`
  font-size: 20px;
  font-family: serif;
  color: rgba(255, 255, 255, 1);
  margin: 0;
  opacity: 2;
`;
