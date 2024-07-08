import { HTMLMotionProps, motion } from "framer-motion";
import styled from "styled-components";

type BasicCircleProps = {
  color?: string;
  width?: number;
  height?: number;
} & HTMLMotionProps<"div">;

export const BasicCircle = ({
  color,
  width,
  height,
  ...props
}: BasicCircleProps) => {
  return <Circle color={color} width={width} height={height} {...props} />;
};

const Circle = styled(motion.div)<{
  color?: string;
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width || 100}px;
  height: ${(props) => props.height || 100}px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color || "rgba(255, 255, 255, 1)"};
  position: absolute;
`;
