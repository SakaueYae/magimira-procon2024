import styled from "styled-components";
import { BasicCircle } from "./BasicCircle";
import { Ref } from "react";

type CircleProps = {
  x: number;
  y: number;
  color?: string;
  isChorus?: boolean;
  ref?: Ref<HTMLDivElement>;
};

export const Circle = ({ x, y, color, isChorus, ref }: CircleProps) => {
  return (
    <Container x={x} y={y} ref={ref}>
      <BasicCircle
        initial={{ scale: 0.5, borderColor: color ?? "rgba(255, 255, 255, 1)" }}
        animate={{
          scale: !isChorus ? 3 : 5,
          borderColor: color
            ? color.slice(0, -2) + "0)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 1 }}
        color={color}
      />
      {isChorus && (
        <BasicCircle
          initial={{
            scale: 0.5,
            borderColor: color ?? "rgba(255, 255, 255, 1)",
          }}
          animate={{
            scale: 5,
            borderColor: color
              ? color.slice(0, -2) + "0)"
              : "rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 1, delay: 0.1 }}
          color={color}
        />
      )}
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
