import { motion } from "framer-motion";
import styled from "styled-components";

type HamburgerIconProps = {
  onClick: () => void;
};

export const HamburgerIcon = ({ onClick }: HamburgerIconProps) => {
  return (
    <Container onClick={onClick}>
      <Line
        variants={{
          open: { rotate: -45, y: 10 },
          closed: { rotate: 0, y: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
      <Line
        variants={{
          open: { opacity: 0 },
          closed: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
      <Line
        variants={{
          open: { rotate: 45, y: -10 },
          closed: { rotate: 0, y: 0 },
        }}
        transition={{ duration: 0.2 }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  right: 0;
  cursor: pointer;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const Line = styled(motion.div)`
  height: 5px;
  width: 50px;
  background-color: rgb(255, 255, 255);
  z-index: 1;
`;
