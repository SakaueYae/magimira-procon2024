import styled from "styled-components";
import { motion } from "framer-motion";

type MusicTitleItemProps = {
  title: string;
  isSelected: boolean;
  color: string;
  onClick: () => void;
};

export const MusicTitleItem = ({
  title,
  isSelected,
  color,
  onClick,
}: MusicTitleItemProps) => {
  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        x: { stiffness: 1000 },
      },
    },
    closed: {
      opacity: 0,
      x: 100,
    },
  };

  return (
    <Container
      isSelected={isSelected}
      color={color}
      onClick={onClick}
      variants={variants}
    >
      <MusicTitleText>{title}</MusicTitleText>
    </Container>
  );
};

const Container = styled(motion.li)<{ isSelected: boolean; color: string }>`
  padding: 10px;
  cursor: pointer;
  ${({ isSelected, color }) => isSelected && `border:1px solid ${color}`};
  ${({ isSelected, color }) =>
    isSelected && `text-shadow: 0 0 5px ${color},0 0 5px ${color}`};
  color: ${({ color }) => `${color}`};
  list-style: none;
  border-radius: 5px;
`;

const MusicTitleText = styled.p`
  margin: 0;
  font-size: 25px;
  font-family: serif;
`;
