import styled from "styled-components";
import { motion } from "framer-motion";

type CircleWithTextProps = {
  x: number;
  y: number;
  text: string;
};

export const CircleWithText = ({ x, y, text }: CircleWithTextProps) => {
  return (
    <BasicCircle
      animate={{
        scale: [0.5, 0.5, 3],
        opacity: [1, 1, 1],
        backgroundColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0)",
        ],
      }}
      transition={{ duration: 1 }}
      // initial={{ scale: 0 }}
      x={x}
      y={y}
    >
      {text}
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
  color: red;
`;
