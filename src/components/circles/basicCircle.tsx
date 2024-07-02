import { HTMLMotionProps, motion } from "framer-motion";
import styled from "styled-components";

type BasicCircleProps = {
  color?: string;
} & HTMLMotionProps<"div">;

export const BasicCircle = ({ color, ...props }: BasicCircleProps) => {
  return <Circle color={color} {...props} />;
};

const Circle = styled(motion.div)<{
  color?: string;
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color || "rgba(255, 255, 255, 1)"};
  position: absolute;
`;
