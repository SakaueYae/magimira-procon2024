import styled from "styled-components";
import { BasicCircle } from "./basicCircle";

type CircleProps = {
  x: number;
  y: number;
  color?: string;
  isChorus?: boolean;
};

export const Circle = ({ x, y, color, isChorus }: CircleProps) => {
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
          scale: !isChorus ? [0.5, 3, 3] : [0.5, 5, 5],
          borderColor,
        }}
        transition={{ duration: 4, times: [0, 0.25, 1] }}
        color={color}
      />
    </Container>
  );
  {
    /* <BasicCircle
      animate={{
        scale: [0.5, 3, 3],
        borderColor,
      }}
      transition={{ duration: 4, times: [0, 0.25, 1] }}
      x={x}
      y={y}
      color={color}
    >
      <Text
        animate={{
          opacity: [1, 1, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(10px)"],
        }}
        transition={{ duration: 4, times: [0, 0.25, 1] }}
      >
        {text}
      </Text>
    </BasicCircle> */
  }
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
