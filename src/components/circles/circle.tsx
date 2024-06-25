import styled from "styled-components";
import { motion } from "framer-motion";

type CircleProps = {
  x: number;
  y: number;
  text?: string;
};

export const Circle = ({ x, y, text }: CircleProps) => {
  return (
    <BasicCircle
      animate={{
        scale: [0.5, 0.5, 3],
        opacity: [1, 0.5, 0],
        backgroundColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0)",
        ],
      }}
      transition={{ duration: 1 }}
      x={x}
      y={y}
    >
      <Text
        animate={{
          opacity: [1, 2, 2],
        }}
      >
        {text}
      </Text>
    </BasicCircle>
  );
};

const BasicCircle = styled(motion.div)<{ x: number; y: number }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(motion.p)`
  font-size: 20px;
  font-family: serif;
  color: rgba(255, 255, 255, 1);
  margin: 0;
  opacity: 2;
`;
